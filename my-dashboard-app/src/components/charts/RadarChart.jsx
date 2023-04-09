import React from 'react';
import PropTypes from 'prop-types';
import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

const RadarChart = ({ data }) => {
  return (
    <RechartsRadarChart width={500} height={300} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="activityType" />
      <PolarRadiusAxis />
      <Radar name="Activities" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Legend />
    </RechartsRadarChart>
  );
};

RadarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RadarChart;
