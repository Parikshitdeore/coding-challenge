import React from "react";
import { Chart } from "react-google-charts";

function Barchart({ month, barChart = [] }) {
  const data = [["Price Range", "Count"], ...barChart];

  const options = {
    chart: {
      title: "",
      subtitle: "Price ranges and number of Items sold",
    },
  };
  return (
    <div className="barchart-container">
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
export default Barchart;
