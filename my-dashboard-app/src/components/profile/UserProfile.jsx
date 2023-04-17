import React from "react";
import PropTypes from 'prop-types';
import Header from "../Header";
import RadarChartComponent from "../charts/RadarChart";
import RadialBarChartComponent from "../charts/RadialBarChart";
import LineChart from "../charts/LineChart";
import PerformanceChart from "../charts/PerformanceChart";
import {
  getUserInfo,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
  getUserDailyGoalCompletion,
} from "../../services/apiService";

const UserProfile = ({ userId }) => {
  const [userInfo, setUserInfo] = React.useState(null);
  const [userActivity, setUserActivity] = React.useState(null);
  const [userAverageSessions, setUserAverageSessions] = React.useState(null);
  const [userPerformanceData, setUserPerformanceData] = React.useState(null);
  const [userDailyGoalCompletion, setUserDailyGoalCompletion] = React.useState(null);
  const [goalCompletionData, setGoalCompletionData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoData = await getUserInfo(userId);
        setUserInfo(userInfoData);

        const userActivityData = await getUserActivity(userId);
        setUserActivity(userActivityData);

        const userAverageSessionsData = await getUserAverageSessions(userId);
        setUserAverageSessions(userAverageSessionsData);

        const userPerformanceData = await getUserPerformance(userId);
        setUserPerformanceData(userPerformanceData);

        const goalCompletionData = await getUserDailyGoalCompletion(userId);
        setGoalCompletionData(goalCompletionData);
      } catch (error) {
        console.error('Error fetching user daily goal completion data:', error);
        setGoalCompletionData([]); // Set data to an empty array in case of error
      }
    };

    fetchData();
  }, [userId]);

  console.log('goalCompletionData:', goalCompletionData);

  return (
    <>
      <Header userInfo={userInfo} />
      {userActivity ? <RadarChartComponent data={Object.values(userActivity)} /> : <p>Loading user activity...</p>}
      {goalCompletionData ? <RadialBarChartComponent data={goalCompletionData} /> : <p>Loading daily goal completion...</p>}
      {userAverageSessions ? <LineChart data={userAverageSessions} /> : <p>Loading average sessions...</p>}
      {userPerformanceData ? <PerformanceChart data={userPerformanceData} /> : <p>Loading performance data...</p>}
    </>
  );
};

UserProfile.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserProfile;
