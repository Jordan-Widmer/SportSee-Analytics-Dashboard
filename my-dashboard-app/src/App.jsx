import { useState, useEffect } from 'react';
import UserProfile from './components/profile/UserProfile';
import Card from "./components/cards/Card";
import RadarChart from './components/charts/RadarChart';
import RadialBarChart from './components/charts/RadialBarChart';
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
      { name: 'Performance', value: 70 },
      { name: 'Stability', value: 85 },
      { name: 'Usability', value: 60 },
      { name: 'Security', value: 95 },
      { name: 'Scalability', value: 75 },
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
      <div>
        <h2>Radial Bar Chart</h2>
        <RadialBarChart userId={userId} data={radialChartData} />
      </div>
    </div>
  );
}

export default App;
