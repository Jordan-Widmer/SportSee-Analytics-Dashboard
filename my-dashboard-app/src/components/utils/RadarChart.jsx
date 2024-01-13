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
import DataFormatter from "../../services/DataFormatter"; // Assurez-vous que le chemin d'accès est correct

// Composant personnalisé pour l'infobulle du graphique radar
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

// Composant pour afficher un graphique radar de la performance de l'utilisateur
const PerformanceChart = ({ data }) => {
  const chartRef = useRef(null);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (chartRef.current) {
      console.log(
        "Dimensions du conteneur du graphique :",
        chartRef.current.getBoundingClientRect()
      );
    }
  }, [chartRef]);

  useEffect(() => {
    console.log("Données avant le formatage :", data); // Ajout du log pour les données avant le formatage
    const formatted = DataFormatter.formatPerformanceData(data);
    console.log("Données après le formatage :", formatted); // Ajout du log pour les données après le formatage
    setFormattedData(formatted);
  }, [data]);

  return (
    <div ref={chartRef} className={styles.radarchartContainer}>
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