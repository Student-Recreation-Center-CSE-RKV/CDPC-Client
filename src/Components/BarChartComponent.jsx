// BarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data, metric }) => {
  // Define a label for the Y-Axis based on the metric
  const metricLabel = {
    totalStudentsPlaced: 'Total Students Placed',
    averagePackage: 'Average Package (₹ LPA)',
    highestPackage: 'Highest Package (₹ LPA)',
    overallRate: 'Overall Placement Rate (%)',
  }[metric] || metric;

  // Define a gradient id based on the metric
  const gradientId = {
    overallRate: 'colorOverallRate',
    averagePackage: 'colorAveragePackage',
    highestPackage: 'colorHighestPackage',
    totalStudentsPlaced: 'colorTotalStudentsPlaced',
  }[metric];

  // Custom font size based on screen width (you can tweak these values)
  const getFontSize = () => {
    if (window.innerWidth < 576) return '10px';  // Extra small screens
    if (window.innerWidth < 768) return '12px';  // Small screens
    if (window.innerWidth < 992) return '14px';  // Medium screens
    return '16px';                               // Large screens and above
  };
//  console.log(data);
  return (
    <div>
      <h3 style={{ fontSize: getFontSize() }}>{metricLabel}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <defs>
            {/* Define the gradients for each metric */}
            <linearGradient id="colorOverallRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="#4caf50" stopOpacity={1} />
              <stop offset="90%" stopColor="#66bb6a" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorAveragePackage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="#3f51b5" stopOpacity={1} />
              <stop offset="90%" stopColor="#5c6bc0" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorHighestPackage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="#ff9800" stopOpacity={1} />
              <stop offset="90%" stopColor="#ffb74d" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorTotalStudentsPlaced" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="#e91e63" stopOpacity={1} />
              <stop offset="90%" stopColor="#f06292" stopOpacity={1} />
            </linearGradient>
          </defs>

          <XAxis 
            dataKey="year" 
            tick={{ fontSize: getFontSize() }} // Responsive font size for X-axis labels
          />
          <YAxis 
            tick={{ fontSize: getFontSize() }} // Responsive font size for Y-axis labels
          />
          <Tooltip 
            contentStyle={{ fontSize: getFontSize() }} // Responsive font size for tooltip
          />
          <Legend 
            wrapperStyle={{ fontSize: getFontSize(), color: 'black' }} // Responsive font size for legend
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar 
            dataKey={metric} 
            fill={`url(#${gradientId})`} 
            barSize={50} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
