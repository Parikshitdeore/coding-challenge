import React from "react";
import { Chart } from "react-google-charts";

function Barchart({ monthStr, barChart = {} }) {
  const { data = [] } = barChart;
  const bar = [["Price Range", "Count"], ...data];

  const options = {
    chart: {
      title: "Price ranges and number of Items sold",
    },
  };

  return (
    <div className="barchart-container">
      <h1>Bar Chart Stats - {monthStr}</h1>
      <div className="chart">
        <Chart
          chartType="Bar"
          width="100%"
          height="500px"
          data={bar}
          options={options}
        />
      </div>
    </div>
  );
}
export default Barchart;
