import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { getUserAverageSessions } from '../../services/apiService';
import UserModel from '../../models/UserModel';

const LineChart = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getUserAverageSessions(userId);
        const userModel = new UserModel(fetchedData);
        setData(userModel.getAverageSessionsData());
      } catch (error) {
        console.error('Error fetching user average sessions data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {data ? (
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
};

export default LineChart;
