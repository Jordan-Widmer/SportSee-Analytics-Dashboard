import React from 'react';
import PropTypes from 'prop-types';
import { LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const LineChart = ({ userId, data }) => {
  return (
    <div>
      {data && data.length > 0 ? (
        <RechartsLineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avgDuration" stroke="#8884d8" activeDot={{ r: 8 }} />
        </RechartsLineChart>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

LineChart.propTypes = {
  userId: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};

export default LineChart;
