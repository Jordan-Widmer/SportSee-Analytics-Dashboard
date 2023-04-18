import React from "react";
import PropTypes from 'prop-types';
import Header from "../Header";
import RadarChartComponent from "../charts/RadarChart";
import RadialBarChartComponent from "../charts/RadialBarChart";
import LineChart from "../charts/LineChart";
import PerformanceChart from "../charts/PerformanceChart";
import useFetchUserData from "../../hooks/useFetchUserData";

const UserProfile = ({ userId }) => {
  const {
    userInfo,
    userActivity,
    userAverageSessions,
    userPerformanceData,
    goalCompletionData,
  } = useFetchUserData(userId);

  const transformedPerformanceData = userPerformanceData
    ? userPerformanceData.data.map((item, index) => ({
        name: userPerformanceData.kind.name + (index + 1),
        value: item.value,
      }))
    : null;

  return (
    <>
      <Header userInfo={userInfo} />
      {userActivity ? <RadarChartComponent data={Object.values(userActivity)} /> : <p>Loading user activity...</p>}
      {goalCompletionData ? <RadialBarChartComponent data={goalCompletionData} /> : <p>Loading daily goal completion...</p>}
      {userAverageSessions ? <LineChart data={userAverageSessions} /> : <p>Loading average sessions...</p>}
      {transformedPerformanceData ? <PerformanceChart data={transformedPerformanceData} /> : <p>Loading performance data...</p>}
    </>
  );
};

UserProfile.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserProfile;
