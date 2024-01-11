// Importing React hooks
import { useState, useEffect } from "react";

// Importing API service functions
import {
  getUserInfo,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
  getUserDailyGoalCompletion,
} from "../services/apiService";

// Custom hook for fetching and managing user data
const useFetchUserData = (userId) => {
  // State hooks for storing different aspects of user data
  const [userInfo, setUserInfo] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformanceData, setUserPerformanceData] = useState(null);
  const [userDailyGoalCompletion, setUserDailyGoalCompletion] = useState(null);
  const [goalCompletionData, setGoalCompletionData] = useState([]);

  // Effect hook to fetch data when userId changes
  useEffect(() => {
    // Async function to fetch user data from various endpoints
    const fetchData = async () => {
      try {
        // Fetching user info and updating state
        const userInfoData = await getUserInfo(userId);
        setUserInfo(userInfoData);

        // Fetching user activity data
        const userActivityData = await getUserActivity(userId);
        setUserActivity(userActivityData);

        // Fetching user average sessions data
        const userAverageSessionsData = await getUserAverageSessions(userId);
        setUserAverageSessions(userAverageSessionsData);

        // Fetching user performance data
        const userPerformanceData = await getUserPerformance(userId);
        setUserPerformanceData(userPerformanceData.data);

        // Fetching user daily goal completion data
        const goalCompletionData = await getUserDailyGoalCompletion(userId);
        setGoalCompletionData(goalCompletionData);
      } catch (error) {
        // Handling errors and setting default state in case of fetch failure
        console.error("Error fetching user daily goal completion data:", error);
        setGoalCompletionData([]); // Set data to an empty array in case of error
      }
    };

    // Invoking the fetchData function
    fetchData();
  }, [userId]); // Dependency array with userId to re-run effect when userId changes

  // Returning the fetched data so it can be used by components
  return {
    userInfo,
    userActivity,
    userAverageSessions,
    userPerformanceData,
    goalCompletionData,
  };
};

// Exporting the custom hook for use in other components
export default useFetchUserData;
