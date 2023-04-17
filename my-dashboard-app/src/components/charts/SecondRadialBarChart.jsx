import React from 'react';
import PropTypes from 'prop-types';
import { RadialBarChart as RechartsRadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

const SecondRadialBarChart = ({ data }) => {
  return (
    <div>
      {data && data.length > 0 ? (
        <RechartsRadialBarChart width={500} height={300} data={data} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10}>
          <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="completion" />
          <Tooltip />
          <Legend />
        </RechartsRadialBarChart>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

SecondRadialBarChart.propTypes = {
  data: PropTypes.array,
};

export default SecondRadialBarChart;
