import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
Chart.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

const BarChart = ({ data }) => {
  const [dataSet, setDataSet] = useState({ set: [], label: [] });

  const translate = {
    profit: "Ganancia",
    billing: "Facturado",
    liquidated: "Liquidado",
    expenses: "Gastos",
  };
  useEffect(() => {
    if (data) {
      let newDataSet = [];
      let newDataLabel = [];
      Object.entries(data).map(([key, value]) => {
        if (translate[key]) {
          newDataSet.push(value);
          newDataLabel.push(translate[key]);
        }
      });
      setDataSet({ set: newDataSet, label: newDataLabel });
    }
  }, [data]);

  const data_ = {
    labels: dataSet.label,
    datasets: [
      {
        label: "Monto en $",
        backgroundColor: ["green", "#60f7ca", "blue"],
        borderColor: "black",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,146,51,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dataSet.set,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
        }}
      >
        <Bar data={data_} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
