import React from "react";

const Statistics = ({ month, statistics }) => {
  const {
    totalSale = 0,
    soldInMonth = 0,
    notSoldInMonth = 0,
  } = (statistics = {});
  return (
    <div className="stats-container">
      <h2>Statistics - {month}</h2>
      <div className="stats-box">
        <div className="stats">
          <p>Total sale</p>
          <p>{Math.round(totalSale)}</p>
        </div>
        <div className="stats">
          <p>Total sold Item</p>
          <p>{soldInMonth}</p>
        </div>
        <div className="stats">
          <p>Total not sold Item</p>
          <p>{notSoldInMonth}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
