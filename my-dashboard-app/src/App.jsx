// Importing necessary React components and hooks
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Importing custom components for the UI
import Header from "./components/interfaces/Header";
import Sidebar from "./components/interfaces/Sidebar";
import BarChartComponent from "./components/utils/BarChart";
import RadialBarChartComponent from "./components/utils/RadialBartChart";
import LineChart from "./components/utils/LineChart";
import PerformanceChart from "./components/utils/RadarChart";

// Custom hook for fetching user data
import useFetchUserData from "./hooks/useFetchUserData";

// Additional UI components
import Card from "./components/interfaces/Card";

// CSS for the app
import "./index.css";

function App() {
  // Static user ID for demonstration; replace with dynamic data in a real app
  const userId = 12;

  // State for storing radial chart data
  const [radialChartData, setRadialChartData] = useState([]);

  // Effect hook for fetching user's todo data
  useEffect(() => {
    // Fetching todos for the specified user
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then((response) => response.json())
      .then((data) => {
        // Calculating completed and not completed tasks
        const completed = data.filter((item) => item.completed).length;
        const notCompleted = data.length - completed;

        // Setting the radial chart data
        setRadialChartData([
          { name: "Completed", completion: completed },
          { name: "Not Completed", completion: notCompleted },
        ]);
      })
      .catch((error) => console.log(error));
  }, [userId]); // Dependency array to re-run the effect when userId changes

  // Fetching additional user data using a custom hook
  const {
    userInfo,
    userActivity,
    userAverageSessions,
    userPerformanceData,
    goalCompletionData,
  } = useFetchUserData(userId);

  // Destructuring user information for easy access
  const { firstName, lastName, age } = userInfo?.data?.userInfos || {};

  // Transforming performance data for chart
  const transformedPerformanceData = userPerformanceData
    ? userPerformanceData.data.map((item, index) => ({
        name: userPerformanceData.kind.name + (index + 1),
        value: item.value,
      }))
    : null;

  // Static data for demonstration purposes
  const data = [{ name: "Objectif", value: 75 }];

  // JSX for rendering the app UI
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
          {/* Rendering bar chart with user activity data or loading message */}
          {userActivity ? (
            <BarChartComponent data={Object.values(userActivity)} />
          ) : (
            <p>Loading user activity...</p>
          )}
          <div className="secChartContainer">
            {/* Rendering line chart with user session data or loading message */}
            {userAverageSessions ? (
              <LineChart data={userAverageSessions} />
            ) : (
              <p>Loading average sessions...</p>
            )}
            {/* Rendering performance chart with transformed data or loading message */}
            {transformedPerformanceData ? (
              <PerformanceChart data={transformedPerformanceData} />
            ) : (
              <p>Loading performance data...</p>
            )}
            <RadialBarChartComponent data={data} />
          </div>
        </div>
        <div className="cardContainer">
          {/* Passing userId to Card component */}
          <Card userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default App;
