
import React, { useEffect, useRef } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, BarController, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';


Chart.register(CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend);

const AnalyticsChart = () => {
  const chartRefs = [useRef(null), useRef(null), useRef(null)];

  const datasets = [
    {
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.8)');
        gradient.addColorStop(1, 'rgba(75, 192, 192, 0.3)');
        return gradient;
      },
    },
    {
      label: 'Expenses',
      data: [5, 8, 2, 3, 1, 4],
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(255, 99, 132, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 99, 132, 0.3)');
        return gradient;
      },
    },
    {
      label: 'Profit',
      data: [7, 11, 1, 2, 1, -1],
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(54, 162, 235, 0.8)');
        gradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)');
        return gradient;
      },
    },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.5)',
        },
      },
    },
  };

  useEffect(() => {
    chartRefs.forEach(ref => {
      const chartInstance = ref.current;
      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {datasets.map((dataset, index) => (
        <div key={index} className="bg-white p-6 shadow rounded-md h-96">
          <h2 className="text-2xl font-bold mb-4">{dataset.label} Analytics</h2>
          <Bar ref={chartRefs[index]} data={{ labels: ['January', 'February', 'March', 'April', 'May', 'June'], datasets: [dataset] }} options={options} />
        </div>
      ))}
    </div>
  );
};

export default AnalyticsChart;
