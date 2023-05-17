import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./components/interfaces/Header";
import Sidebar from "./components/interfaces/Sidebar";
import BarChartComponent from "./components/utils/BarChart";
import RadialBarChartComponent from "./components/utils/RadialBartChart";
import LineChart from "./components/utils/LineChart";
import PerformanceChart from "./components/utils/RadarChart";
import useFetchUserData from "./hooks/useFetchUserData";
import Card from "./components/interfaces/Card";
import "./index.css";

function App() {
  const userId = 12; // Replace with the ID of the user you want to display
  const [radialChartData, setRadialChartData] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then((response) => response.json())
      .then((data) => {
        const completed = data.filter((item) => item.completed).length;
        const notCompleted = data.length - completed;
        setRadialChartData([
          { name: "Completed", completion: completed },
          { name: "Not Completed", completion: notCompleted },
        ]);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const {
    userInfo,
    userActivity,
    userAverageSessions,
    userPerformanceData,
    goalCompletionData,
  } = useFetchUserData(userId);

  const { firstName, lastName, age } = userInfo?.data?.userInfos || {};

  const transformedPerformanceData = userPerformanceData
    ? userPerformanceData.data.map((item, index) => ({
        name: userPerformanceData.kind.name + (index + 1),
        value: item.value,
      }))
    : null;

  const data = [{ name: "Objectif", value: 75 }];

  return (
    <div className="App">
      <Header />
      <div className="contentWrapper">
        <Sidebar />
        <div className="dashboardContent">
          <div className="profileContainer">
            <h1>
              Welcome <span>{firstName} {lastName}</span>
            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier👏</p>
          </div>
          {userActivity ? (
            <BarChartComponent data={Object.values(userActivity)} />
          ) : (
            <p>Loading user activity...</p>
          )}
          <div className="secChartContainer">
            {userAverageSessions ? (
              <LineChart data={userAverageSessions} />
            ) : (
              <p>Loading average sessions...</p>
            )}
            {transformedPerformanceData ? (
              <PerformanceChart data={transformedPerformanceData} />
            ) : (
              <p>Loading performance data...</p>
            )}
            <RadialBarChartComponent data={data} />
          </div>
        </div>
        <div className="cardContainer">
          <Card userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default App;
