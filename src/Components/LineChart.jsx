// LineChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const LineChartComponent = ({ data, metric }) => {
  // Define a label for the Y-Axis based on the metric
  const metricLabel = {
    totalStudentsPlaced: 'Total Students Placed',
    averagePackage: 'Average Package (₹ LPA)',
    highestPackage: 'Highest Package (₹ LPA)',
    overallRate: 'Overall Placement Rate (%)',
  }[metric] || metric;
  console.log(data);
  return (
    <div>
      <h3>{metricLabel}</h3>
      <LineChart width={800} height={300} data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Line 
          type="monotone" 
          dataKey={metric} 
          stroke="#8884d8" 
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
