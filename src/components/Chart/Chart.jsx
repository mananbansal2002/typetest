// Chart.js
import React, { useEffect, useRef } from 'react';
import { Chart as Chartjs } from 'chart.js/auto';
import './Chart.css'
const Chart = ({ wpmData , themeColor}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
console.log(wpmData);
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
   
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chartjs(ctx, {
        type: 'line',
        data: {
          labels: wpmData.map((entry) => entry.time),
          datasets: [{
            label: 'WPM Over Time',
            data: wpmData.map((entry) => entry.wpm),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
          }],
        },
        options: {
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'WPM', // Y-axis label
              },
              ticks:{
                beginAtZero: true,
                stepSize: 10,
                stepped:false,
                
                
              },
            },
            x: {
              title: {
                display: false, // Hide x-axis label
              },
              ticks: {
                min: 0,
                maxTicksLimit: 60, // Limit the number of ticks on x-axis
              },
            },
          },
          aspectRatio: 5, // Aspect ratio of 1 for square chart
          maintainAspectRatio: true, // Do not maintain aspect ratio
          responsive: true, // Make chart responsive
        },
      });
    }
  }, [wpmData]);

  return <canvas  className={` ${themeColor}-secondary`}ref={chartRef} />;

};

export default Chart;
