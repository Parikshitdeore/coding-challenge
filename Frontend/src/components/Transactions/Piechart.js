import React from "react";
import { Chart } from "react-google-charts";

function Piechart({ month, pieChart = [] }) {
  const title = [["Category", "Number of Items"]];

  const data = [...title];

  pieChart.pie.map((obj) => {
    const arr = [obj._id, obj.count];
    return data.push(arr);
  });

  const options = {
    title: "Company Performance",
  };

  return (
    <div className="piechart-container">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
}

export default Piechart;
