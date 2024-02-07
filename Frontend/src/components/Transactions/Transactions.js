import React from "react";
import "./styles.css";
import useTransactions from "./../../Hooks/useTransactions";
import Statistics from "./Statistics";
import Table from "./Table";
import Barchart from "./Barchart";
import Piechart from "./Piechart";

const Transactions = () => {
  const {
    searchedData,
    setMonth,
    month,
    setSearch,
    setPage,
    perPage,
    setperPage,
    page,
    monthsArray,
    setMonthStr,
    monthStr,
    combinedData = {},
  } = useTransactions();

  const { statistics, barChart, pieChart } = combinedData;

  return (
    <div className="page-container">
      <Table
        month={month}
        searchedData={searchedData}
        perPage={perPage}
        setMonth={setMonth}
        setSearch={setSearch}
        setPage={setPage}
        setperPage={setperPage}
        page={page}
        monthsArray={monthsArray}
        combinedData={combinedData}
        setMonthStr={setMonthStr}
      />
      <Statistics monthStr={monthStr} statistics={statistics} />
      <Barchart monthStr={monthStr} barChart={barChart} />
      <Piechart monthStr={monthStr} pieChart={pieChart} />
    </div>
  );
};

export default Transactions;
