import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { getUserPerformance } from '../../services/apiService';
import UserModel from '../../models/UserModel';

const RadarChart = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getUserPerformance(userId);
        const userModel = new UserModel(fetchedData);
        setData(userModel.getPerformanceData());
      } catch (error) {
        console.error('Error fetching user performance data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {data ? (
        <RechartsRadarChart width={500} height={300} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="activityType" />
          <PolarRadiusAxis />
          <Tooltip />
          <Legend />
          <Radar name="Performance" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RechartsRadarChart>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

RadarChart.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default RadarChart;
