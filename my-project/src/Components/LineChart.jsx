import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from "react-chartjs-2";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true
             
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              type: 'category'
              
            }
          }
        }}
      />
    </div>
  );
}

export default LineChart;
