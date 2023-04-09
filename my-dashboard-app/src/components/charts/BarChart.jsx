import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getUserActivity } from '../../services/apiService';
import UserModel from '../../models/UserModel';

const BarChart = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getUserActivity(userId);
        const userModel = new UserModel(fetchedData);
        setData(userModel.getActivityData());
      } catch (error) {
        console.error('Error fetching user activity data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {data ? (
        <RechartsBarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="calories" fill="#8884d8" />
        </RechartsBarChart>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

BarChart.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default BarChart;
