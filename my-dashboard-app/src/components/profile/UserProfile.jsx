import React from "react";
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

const UserProfile = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  const [userActivity, setUserActivity] = React.useState(null);
  const [userAverageSessions, setUserAverageSessions] = React.useState(null);
  const [userPerformanceData, setUserPerformanceData] = React.useState(null);
  const [userDailyGoalCompletion, setUserDailyGoalCompletion] =
    React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const userInfoData = await getUserInfo(1);
      setUserInfo(userInfoData);

      const userActivityData = await getUserActivity(1);
      setUserActivity(userActivityData);

      const userAverageSessionsData = await getUserAverageSessions(1);
      setUserAverageSessions(userAverageSessionsData);

      const userPerformanceData = await getUserPerformance(1);
      const filteredPerformanceData = userPerformanceData.filter(
        (performance) => performance.userId === 1
      );
      setUserPerformanceData(
        filteredPerformanceData.length
          ? filteredPerformanceData
          : [{ data: [] }]
      );

      const userDailyGoalCompletionData = await getUserDailyGoalCompletion(1);
      const filteredGoalCompletionData = userDailyGoalCompletionData.filter(
        (goalCompletion) => goalCompletion.userId === 1
      );
      setUserDailyGoalCompletion(
        filteredGoalCompletionData.length
          ? filteredGoalCompletionData
          : [{ dailyGoals: [] }]
      );
    };

    fetchData();
  }, []);

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
        <LineChart key="line-chart" userId={1} data={userActivity} />
        {userDailyGoalCompletion[0].dailyGoals.length > 0 && (
          <RadialBarChartComponent
            key="radial-bar-chart"
            userId={1}
            data={userDailyGoalCompletion[0].dailyGoals}
          />
        )}
        {userPerformanceData[0].data.length > 0 && (
          <RadarChartComponent
            key="radar-chart"
            userId={1}
            data={userPerformanceData[0].data}
          />
        )}
      </div>
      <div className="performance-container">
        <div className="performance-container">
          <h2>Performance</h2>
          <PerformanceChart
            key="performance-chart"
            userId={1}
            data={userPerformanceData[0].data}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
