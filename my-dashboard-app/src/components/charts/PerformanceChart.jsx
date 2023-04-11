import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceChart = ({ userId, data }) => {
  // Calculate the average performance value
  const averagePerformance = data.reduce((total, performance) => total + performance.performance, 0) / data.length;

  // Group the data by date
  const dataByDate = data.reduce((groupedData, performance) => {
    const date = new Date(performance.date).toLocaleDateString();
    const existingData = groupedData[date] || { date, performance: 0, count: 0 };
    existingData.performance += performance.performance;
    existingData.count += 1;
    groupedData[date] = existingData;
    return groupedData;
  }, {});

  // Convert the grouped data to an array of objects
  const chartData = Object.values(dataByDate).map(({ date, performance, count }) => ({
    date,
    performance: performance / count,
    average: averagePerformance,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="performance" fill="#8884d8" />
        <Bar dataKey="average" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
