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
  const [userDailyGoalCompletion, setUserDailyGoalCompletion] =
    React.useState(null);

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
        if (Array.isArray(userPerformanceData)) {
          const filteredPerformanceData = userPerformanceData.filter(
            (performance) => performance.userId === userId
          );
          setUserPerformanceData(
            filteredPerformanceData.length
              ? filteredPerformanceData
              : [{ data: [] }]
          );
        }

        const userDailyGoalCompletionData = await getUserDailyGoalCompletion(userId);
        if (Array.isArray(userDailyGoalCompletionData)) {
          const filteredGoalCompletionData = userDailyGoalCompletionData.filter(
            (goalCompletion) => goalCompletion.userId === userId
          );
          setUserDailyGoalCompletion(
            filteredGoalCompletionData.length
              ? filteredGoalCompletionData
              : [{ dailyGoals: [] }]
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  if (
    !userInfo ||
    !userActivity ||
    !userAverageSessions ||
    !userDailyGoalCompletion ||
    !userPerformanceData
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <Header userInfo={userInfo} />
      <div className="charts-container">
        <LineChart key="line-chart" userId={userId} data={userActivity} />
        {userDailyGoalCompletion[0].dailyGoals.length > 0 && (
          <RadialBarChartComponent
            key="radial-bar-chart"
            userId={userId}
            data={userDailyGoalCompletion[0].dailyGoals}
          />
        )}
        {userPerformanceData[0].data.length > 0 && (
          <RadarChartComponent
            key="radar-chart"
            userId={userId}
            data={userPerformanceData[0].data}
          />
        )}
      </div>
      <div className="performance-container">
        <div className="performance-container">
          <h2>Performance</h2>
          <PerformanceChart
            key="performance-chart"
            userId={userId}
            data={userPerformanceData[0].data}
          />
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserProfile;
