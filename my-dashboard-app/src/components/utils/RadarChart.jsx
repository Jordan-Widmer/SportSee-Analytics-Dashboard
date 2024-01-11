import React, { useRef, useEffect, useState } from "react";
import styles from "../css/RadarChart.module.css";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Custom tooltip component for the radar chart
const CustomTooltip = ({ active, payload, label }) => {
  // Display tooltip content if active and payload is available
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.label}>{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null; // Return null if tooltip should not be displayed
};

// Mapping kind of performance to its corresponding name
const kind = {
  1: "cardio",
  2: "energy",
  3: "endurance",
  4: "strength",
  5: "speed",
  6: "intensity",
};

// Component to render a radar chart for user performance
const PerformanceChart = ({ data }) => {
  const chartRef = useRef(null); // Ref to access the DOM element of the chart
  const [formattedData, setFormattedData] = useState([]); // State for formatted chart data

  // Effect to log the dimensions of the chart container
  useEffect(() => {
    if (chartRef.current) {
      console.log(
        "Chart container dimensions:",
        chartRef.current.getBoundingClientRect()
      );
    }
  }, [chartRef]);

  // Effect to format the data for the radar chart
  useEffect(() => {
    data.map((e, i) => {
      const count = i + 1;
      e.kind = kind[count]; // Assigning the kind name based on the mapping
    });
    setFormattedData(data); // Updating the state with the formatted data
  }, [data]);

  // Rendering the radar chart
  return (
    <div ref={chartRef} className={styles.radarchartContainer}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="50%" data={formattedData}>
          <PolarGrid stroke="white" radialLines={false} />
          <PolarAngleAxis dataKey="kind" tick={{ fill: "white", fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, "auto"]} tick={false} />
          <Radar name="User Performance" dataKey="value" fill="rgba(255, 1, 1, 0.7)" />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
