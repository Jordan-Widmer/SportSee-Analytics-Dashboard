import React from 'react';
import PropTypes from 'prop-types';
import { BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const BarChart = ({ data }) => {
  return (
    <RechartsBarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="calories" fill="#8884d8" />
    </RechartsBarChart>
  );
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BarChart;
