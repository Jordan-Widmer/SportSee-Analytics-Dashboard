import { useState, useEffect } from 'react';
import UserProfile from './components/profile/UserProfile';
import LineChart from './components/charts/LineChart';
import Card from "./components/cards/Card";
import RadarChart from './components/charts/RadarChart';
import RadialBarChart from './components/charts/RadialBarChart';
import SecondRadialBarChart from './components/charts/SecondRadialBarChart';
import './App.css';

function App() {
  const userId = 18; // Replace with the ID of the user you want to display
  const [radialChartData, setRadialChartData] = useState([]);
  const [radarChartData, setRadarChartData] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then((response) => response.json())
      .then((data) => {
        const completed = data.filter((item) => item.completed).length;
        const notCompleted = data.length - completed;
        setRadialChartData([{ name: 'Completed', completion: completed }, { name: 'Not Completed', completion: notCompleted }]);
      })
      .catch((error) => console.log(error));

    // Dummy data for RadarChart
    const data = [
      { subject: "Performance", A: 70 },
      { subject: "Stability", A: 85 },
      { subject: "Usability", A: 60 },
      { subject: "Security", A: 95 },
      { subject: "Scalability", A: 75 },
    ];
    setRadarChartData(data);
  }, [userId]);

  return (
    <div className="App">
      <div>
        <h2>User Profile</h2>
        <UserProfile userId={userId} />
      </div>
      <div>
        <h2>Card</h2>
        <Card userId={userId} />
      </div>
      <div>
        <h2>Radar Chart</h2>
        <RadarChart data={radarChartData} />
      </div>
      {/* Temporarily remove the first Radial Bar Chart */}
      {/* <div>
        <h2>First Radial Bar Chart</h2>
        <RadialBarChart data={radialChartData} />
      </div> */}
      <div>
        <h2>Second Radial Bar Chart</h2>
        <SecondRadialBarChart data={radialChartData} />
      </div>
    </div>
  );
}

export default App;
