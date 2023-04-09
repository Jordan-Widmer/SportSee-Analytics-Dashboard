import React from 'react';
import PropTypes from 'prop-types';
import { LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const LineChart = ({ data }) => {
  return (
    <RechartsLineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="averageDuration" stroke="#8884d8" />
    </RechartsLineChart>
  );
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default LineChart;
