import { useEffect, useState } from "react";
import axios from "axios";

const useTransactions = () => {
  const [month, setMonth] = useState(3);
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [combinedData, setCombinedData] = useState({});
  const [perPage, setperPage] = useState(2);
  const [page, setPage] = useState(1);
  const [monthStr, setMonthStr] = useState("March");

  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetchSearch();
  }, [month, search, page, perPage]);

  useEffect(() => {
    fetchCombinedStats();
    setPage(1);
  }, [month]);

  const fetchSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/transactions?month=${month}&search=${search}&perPage=${perPage}&page=${page}`
      );
      setSearchedData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCombinedStats = async () => {
    try {
      const res = await axios(
        `http://localhost:5000/combinedStatistics?month=${month}`
      );
      setCombinedData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    month,
    setMonth,
    search,
    setSearch,
    searchedData,
    combinedData,
    setPage,
    page,
    perPage,
    setperPage,
    monthsArray,
    monthStr,
    setMonthStr,
  };
};

export default useTransactions;
