import React from "react";
import "./styles.css";
import useTransactions from "./useTransactions";
import Statistics from "./Statistics";
import Table from "./Table";
import Barchart from "./Barchart";
import Piechart from "./Piechart";

const Transactions = () => {
  const {
    data,
    setMonth,
    month,
    setSearch,
    setPage,
    setperPage,
    page,
    monthsArray,
    combinedData = {},
  } = useTransactions();

  const { statistics, barChart, pieChart } = combinedData;

  return (
    <div>
      <Table
        month={month}
        data={data}
        setMonth={setMonth}
        setSearch={setSearch}
        setPage={setPage}
        setperPage={setperPage}
        page={page}
        monthsArray={monthsArray}
        combinedData={combinedData}
      />
      <Statistics month={month} statistics={statistics} />
      <Barchart month={month} barChart={barChart} />
      <Piechart month={month} pieChart={pieChart} />
    </div>
  );
};

export default Transactions;
