import React, { useRef, useEffect, useState } from "react";
import styles from "../css/RadarChart.module.css";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.label}>{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const kind = {
  1: "cardio",
  2: "energy",
  3: "endurance",
  4: "strength",
  5: "speed",
  6: "intensity",
};

const PerformanceChart = ({ data }) => {
  const chartRef = useRef(null);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (chartRef.current) {
      console.log(
        "Chart container dimensions:",
        chartRef.current.getBoundingClientRect()
      );
    }
  }, [chartRef]);

  useEffect(() => {
    data.map((e, i) => {
      const count = i + 1;
      e.kind = kind[count];
    });
    setFormattedData(data);
  }, [data]);

  return (
    <div ref={chartRef} className={styles.radarchartContainer}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="50%" data={formattedData}>
          <PolarGrid stroke="white" radialLines={false} />
          <PolarAngleAxis
            dataKey="kind"
            tick={{ fill: "white", fontSize: 10 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, "auto"]} tick={false} />
          <Radar
            name="User Performance"
            dataKey="value"
            fill="rgba(255, 1, 1, 0.7)"
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
