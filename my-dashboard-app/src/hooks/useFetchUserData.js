import { useState, useEffect } from 'react';
import {
  getUserInfo,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
  getUserDailyGoalCompletion,
} from '../services/apiService';

const useFetchUserData = (userId) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformanceData, setUserPerformanceData] = useState(null);
  const [userDailyGoalCompletion, setUserDailyGoalCompletion] = useState(null);
  const [goalCompletionData, setGoalCompletionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoData = await getUserInfo(userId);
        setUserInfo(userInfoData);

        const userActivityData = await getUserActivity(userId);
        setUserActivity(userActivityData);

        const userAverageSessionsData = await getUserAverageSessions(userId);
        setUserAverageSessions(userAverageSessionsData);

        const userPerformanceData = await getUserPerformance(userId);
        setUserPerformanceData(userPerformanceData.data);

        const goalCompletionData = await getUserDailyGoalCompletion(userId);
        setGoalCompletionData(goalCompletionData);
      } catch (error) {
        console.error('Error fetching user daily goal completion data:', error);
        setGoalCompletionData([]); // Set data to an empty array in case of error
      }
    };

    fetchData();
  }, [userId]);

  return {
    userInfo,
    userActivity,
    userAverageSessions,
    userPerformanceData,
    goalCompletionData,
  };
};

export default useFetchUserData;
