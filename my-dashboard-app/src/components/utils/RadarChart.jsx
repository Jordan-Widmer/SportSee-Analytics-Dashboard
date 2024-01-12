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

// Composant personnalisé pour l'infobulle du graphique radar
const CustomTooltip = ({ active, payload, label }) => {
  // Affichage du contenu de l'infobulle si actif et payload disponible
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.label}>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null; // Retourne null si l'infobulle ne doit pas être affichée
};

// Mappage du type de performance à son nom correspondant
const kind = {
  1: "cardio",
  2: "énergie",
  3: "endurance",
  4: "force",
  5: "vitesse",
  6: "intensité",
};

// Composant pour afficher un graphique radar de la performance de l'utilisateur
const PerformanceChart = ({ data }) => {
  const chartRef = useRef(null); // Réf pour accéder à l'élément DOM du graphique
  const [formattedData, setFormattedData] = useState([]); // État pour les données formatées du graphique

  // Effet pour enregistrer les dimensions du conteneur du graphique
  useEffect(() => {
    if (chartRef.current) {
      console.log(
        "Dimensions du conteneur du graphique :",
        chartRef.current.getBoundingClientRect()
      );
    }
  }, [chartRef]);

  // Effet pour formater les données pour le graphique radar
  useEffect(() => {
    data.map((e, i) => {
      const count = i + 1;
      e.kind = kind[count]; // Assignation du nom du type basé sur le mappage
    });
    setFormattedData(data); // Mise à jour de l'état avec les données formatées
  }, [data]);

  // Rendu du graphique radar
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
