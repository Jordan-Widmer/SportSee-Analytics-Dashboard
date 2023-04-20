import React, { useRef, useEffect } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const kind = {
  1: 'cardio',
  2: 'energy',
  3: 'endurance',
  4: 'strength',
  5: 'speed',
  6: 'intensity'
};

const PerformanceChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      console.log('Chart container dimensions:', chartRef.current.getBoundingClientRect());
    }
  }, [chartRef]);

  const formattedData = Object.values(kind).map((name, index) => ({
    name,
    value: data[index] ? data[index].value : 0,
  }));

  return (
    <div ref={chartRef} style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" stroke="#000" />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} />
          <Radar
            name="User Performance"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
