import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "utils/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Average Rating",
    },
  },
  scales: {
    yAxis: {
      min: 0,
      max: 5,
    },
  },
};

export const ReviewChart = (): JSX.Element => {

  const [data, setData] = useState<ChartData<"line", unknown, unknown>>();
  const chartData = useAppSelector((state) => state.product.productChartData); 

  useEffect(() => {
    if (chartData) {
      setData({
        datasets: [
          {
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: chartData,
          },
        ],
      });
    }
  }, [chartData]);

  return data ? (
    <Line options={options} data={data} height="100%" />
  ) : (
    <CircularProgress />
  );
};
