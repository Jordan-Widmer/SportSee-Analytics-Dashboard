import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RadialBarChart as RechartsRadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import { getUserDailyGoalCompletion } from '../../services/apiService';

const RadialBarChartComponent = ({ userId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserDailyGoalCompletion(userId);
        if (response && response.data) {
          const filteredData = response.data.filter(goalCompletion => goalCompletion.userId === userId);
          const dailyGoals = filteredData.length ? filteredData[0].dailyGoals : [];
          const completedCount = dailyGoals.filter(item => item.goalCompleted).length;
          const notCompletedCount = dailyGoals.length - completedCount;
          setData([{ name: 'Completed', completion: completedCount }, { name: 'Not Completed', completion: notCompletedCount }]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

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

RadialBarChartComponent.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default RadialBarChartComponent;
