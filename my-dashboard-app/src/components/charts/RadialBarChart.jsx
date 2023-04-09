import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RadialBarChart as RechartsRadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import { getUserDailyGoalCompletion } from '../../services/apiService';
import UserModel from '../../models/UserModel';

const RadialBarChart = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getUserDailyGoalCompletion(userId);
        const userModel = new UserModel(fetchedData);
        setData([userModel.getDailyGoalCompletionData()]);
      } catch (error) {
        console.error('Error fetching user daily goal completion data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {data ? (
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

RadialBarChart.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default RadialBarChart;
