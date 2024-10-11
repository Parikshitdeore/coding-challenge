const express = require("express");
const cors = require(`cors`);
const app = express();
const axios = require("axios");
const initializeDatabase = require("./db/db_connect");
const Transaction = require("./models/transaction");

app.use(express.json());

app.use(cors());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, This is coding challenge Backend");
});

app.listen(5000, () => {
  console.log(`Server is listening on port`, 5000);
});

app.get(`/transactions`, async (req, res) => {
  try {
    const { page = 1, perPage = 10, month = 3, search } = req.query;

    let transactions = await Transaction.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
      },
    });

    if (search) {
      transactions = transactions.filter((transaction) => {
        return (
          transaction.title.toLowerCase().includes(search.toLowerCase()) ||
          transaction.description
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          transaction.price
            .toString()
            .toLowerCase()
            .includes(search.toString().toLowerCase())
        );
      });
    }

    const totalPages = Math.ceil(transactions.length / perPage);

    const paginatedTransactions = transactions.slice(
      (page - 1) * perPage,
      page * perPage
    );
    res.status(201).json({ data: { paginatedTransactions, totalPages } });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

app.get(`/statistics`, async (req, res) => {
  try {
    const month = req.query.month || 3;

    const transactions = await Transaction.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
      },
    });

    const totalSale = transactions.reduce((acc, curr) => {
      return (acc = curr.sold ? curr.price + acc : acc);
    }, 0);

    const soldInMonth = transactions.reduce((acc, curr) => {
      return (acc = curr.sold ? acc + 1 : acc);
    }, 0);

    const notSoldInMonth = transactions.reduce((acc, curr) => {
      return (acc = curr.sold ? acc : acc + 1);
    }, 0);

    res.status(201).json({ data: { totalSale, soldInMonth, notSoldInMonth } });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

app.get(`/barchart`, async (req, res) => {
  try {
    const month = req.query.month || 3;

    // const sortedRange = {};
    const sortedRange = [];

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Number.MAX_SAFE_INTEGER },
    ];

    for (const range of priceRanges) {
      const count = await Transaction.countDocuments({
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
        },
        price: { $gte: range.min, $lte: range.max },
      });

      // priceRanges.map((range)=>{
      //   const count = await Transaction.countDocuments({
      //      $expr: {
      //     $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
      //     },
      //      price: { $gte: range.min, $lte: range.max },
      //   });
      // })

      sortedRange.push([
        `${range.min}-${
          range.max === Number.MAX_SAFE_INTEGER ? `above` : range.max
        }`,
        count,
      ]);
    }

    res.status(201).json({ data: sortedRange });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

app.get(`/piechart`, async (req, res) => {
  try {
    const month = req.query.month || 3;

    let pie = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: `$dateOfSale` }, parseInt(month)],
          },
        },
      },
      {
        $group: { _id: `$category`, count: { $sum: 1 } },
      },
    ]);

    res.status(201).json({ data: pie });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

app.get("/combinedStatistics", async (req, res) => {
  try {
    const { page = 1, perPage = 10, month = 3, search = "" } = req.query;

    const transactionApi = async () => {
      const transactionResponse = await axios.get(
        `http://localhost:5000/transactions?month=${month}&page=${page}&search=${search}&perPage=${perPage}`
      );
      return transactionResponse.data;
    };
    const statisticsApi = async () => {
      const statisticsResponse = await axios.get(
        `http://localhost:5000/statistics?month=${month}`
      );
      return statisticsResponse.data;
    };
    const barChartApi = async () => {
      const barchartResponse = await axios.get(
        `http://localhost:5000/barchart?month=${month}`
      );
      return barchartResponse.data;
    };
    const pieChartApi = async () => {
      const pieChartResponse = await axios.get(
        `http://localhost:5000/piechart?month=${month}`
      );
      return pieChartResponse.data;
    };

    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      transactionApi(),
      statisticsApi(),
      barChartApi(),
      pieChartApi(),
    ]);

    const combinedResult = {
      transactions: transactions,
      statistics: statistics,
      barChart: barChart,
      pieChart: pieChart,
    };

    res.status(201).json(combinedResult);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});
