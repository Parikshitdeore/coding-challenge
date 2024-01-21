import React from "react";
import { Chart } from "react-google-charts";

function Piechart({ monthStr, pieChart = {} }) {
  const { pie = [] } = pieChart;

  const data = [["Category", "Number of Items"]];

  console.log(pie);

  pie.map((obj) => {
    const arr = [obj._id, obj.count];
    console.log(arr);
    return data.push(arr);
  });

  const options = {
    title: `Category and Quantity sold in ${monthStr}`,
    is3D: true,
  };

  return (
    <div className="piechart-container">
      <h1>Pie Chart Stats - {monthStr}</h1>
      <div className="chart">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width="100%"
          height="500px"
        />
      </div>
    </div>
  );
}

export default Piechart;
