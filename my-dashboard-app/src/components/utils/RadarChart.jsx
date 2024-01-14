import React, {useEffect, useState } from "react";
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
import { DataFormatter } from "../../services"; 

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.label}>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};


const PerformanceChart = ({ data }) => {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    setFormattedData(DataFormatter.formatPerformanceData(DataFormatter.userPerformances(data)));
  }, [data]);

  return (
    <div className={styles.radarchartContainer}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="50%" data={formattedData}>
          <PolarGrid stroke="white" radialLines={false} />
          <PolarAngleAxis dataKey="kind" tick={{ fill: "white", fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, "auto"]} tick={false} />
          <Radar name="Performance de l'utilisateur" dataKey="value" fill="rgba(255, 1, 1, 0.7)" />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;