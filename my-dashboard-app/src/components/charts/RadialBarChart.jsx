import React from 'react';
import PropTypes from 'prop-types';
import { RadialBarChart as RechartsRadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

const RadialBarChart = ({ data }) => {
  return (
    <RechartsRadialBarChart
      width={500}
      height={300}
      cx={150}
      cy={150}
      innerRadius={20}
      outerRadius={140}
      barSize={10}
      data={data}
    >
      <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="score" />
      <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ top: 0, left: 350 }} />
      <Tooltip />
    </RechartsRadialBarChart>
  );
};

RadialBarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RadialBarChart;
