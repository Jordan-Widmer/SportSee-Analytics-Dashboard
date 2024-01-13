import { useState, useEffect } from "react";
import mockData from "../mock/mockData.json";
import {
  getUserInfo,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
  getUserDailyGoalCompletion,
} from "../services/apiService";

const useFetchUserData = (userId, useMockData = false) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformanceData, setUserPerformanceData] = useState(null);
  const [userDailyGoalCompletion, setUserDailyGoalCompletion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (useMockData) {
          const mockUserInfo = mockData.USER_MAIN_DATA.find(user => user.id === userId);
          const mockUserActivity = mockData.USER_ACTIVITY.find(activity => activity.userId === userId);
          const mockUserAverageSessions = mockData.USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
          const mockUserPerformance = mockData.USER_PERFORMANCE.find(performance => performance.userId === userId);
          const mockUserDailyGoalCompletion = mockData.USER_DAILY_GOAL_COMPLETION.find(goal => goal.userId === userId);

          setUserInfo({ data: mockUserInfo });
          setUserActivity({ data: mockUserActivity.sessions });
          setUserAverageSessions({ data: mockUserAverageSessions.sessions });
          setUserPerformanceData({ data: mockUserPerformance });
          setUserDailyGoalCompletion({ data: mockUserDailyGoalCompletion.dailyGoals });
        } else {
          const userInfoData = await getUserInfo(userId);
          const userActivityData = await getUserActivity(userId);
          const userAverageSessionsData = await getUserAverageSessions(userId);
          const userPerformanceData = await getUserPerformance(userId);
          const userDailyGoalCompletionData = await getUserDailyGoalCompletion(userId);

          setUserInfo(userInfoData);
          setUserActivity(userActivityData);
          setUserAverageSessions(userAverageSessionsData);
          setUserPerformanceData(userPerformanceData.data);
          setUserDailyGoalCompletion(userDailyGoalCompletionData);
        }
      } catch (error) {
        console.error("Error fetching user data, falling back to mock data:", error);
        const mockUserInfo = mockData.USER_MAIN_DATA.find(user => user.id === userId);
        const mockUserActivity = mockData.USER_ACTIVITY.find(activity => activity.userId === userId);
        const mockUserAverageSessions = mockData.USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
        const mockUserPerformance = mockData.USER_PERFORMANCE.find(performance => performance.userId === userId);
        const mockUserDailyGoalCompletion = mockData.USER_DAILY_GOAL_COMPLETION.find(goal => goal.userId === userId);

        setUserInfo({ data: mockUserInfo });
        setUserActivity({ data: mockUserActivity.sessions });
        setUserAverageSessions({ data: mockUserAverageSessions.sessions });
        setUserPerformanceData({ data: mockUserPerformance });
        setUserDailyGoalCompletion({ data: mockUserDailyGoalCompletion.dailyGoals });
      }
    };

    fetchData();
  }, [userId, useMockData]);

  return {
    userInfo,
    userActivity,
    userAverageSessions,
    userPerformanceData,
    userDailyGoalCompletion,
  };
};

export default useFetchUserData;