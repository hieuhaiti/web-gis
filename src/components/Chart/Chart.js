import React from 'react';
import { Bar } from 'react-chartjs-2';

function CustomChart() {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Number of Items',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear', // Make sure you specify the scale type here
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default CustomChart;
