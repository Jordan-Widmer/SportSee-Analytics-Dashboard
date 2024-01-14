import React, { useEffect } from "react";
import styles from "../css/BarChart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaCircle } from "react-icons/fa";

// Composant personnalisé d'infobulle pour le graphique en barres
// Permet une meilleure compréhension des valeurs lors du survol des barres
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles["custom-tooltip"]}>
        <p className={styles["label"]}>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null; // Retourne null pour éviter un rendu inutile lorsqu'il n'y a pas de données à afficher
};

// Fonction de rendu pour la légende personnalisée
// Permet une identification claire des différentes données représentées sur le graphique
const renderLegend = (props) => {
  return (
    <div className={styles["barchartLegend"]}>
      <h2>Activité quotidienne</h2>
      <ul>
        <li>
          <span className={styles["black"]}>
            <FaCircle />
          </span>
          Poids (kg)
        </li>
        <li>
          <span className={styles["red"]}>
            <FaCircle />
          </span>
          Calories brûlées (kCal)
        </li>
      </ul>
    </div>
  );
};

// Forme personnalisée de barre pour le graphique en barres
// Offre une esthétique unique au graphique pour une meilleure expérience visuelle
const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <path
      d={`M${x},${y + 6} a6,6 0 0 1 6,-6 h${width - 12} a6,6 0 0 1 6,6 v${height - 6} h${-width}z`}
      style={{ fill }}
    />
  );
};


// Composant BarChartComponent pour afficher un graphique en barres
const BarChartComponent = ({ data }) => {




  // Rendu du graphique en barres avec des configurations personnalisées
  // La configuration reflète les besoins spécifiques en matière de visualisation des données
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "320px",
        background: "#FBFBFB",
        margin: "auto",
        marginBottom: "28px",
        borderRadius: "5px",
      }}
    >
      {renderLegend()} {/* Rendu de la légende personnalisée */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data[0].sessions}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis orientation="right" tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="kilogram"
              name="Poids (kg)"
              fill="#282D30"
              shape={<CustomBar />}
            />
            <Bar
              dataKey="calories"
              name="Calories brûlées (kCal)"
              fill="#E60000"
              shape={<CustomBar />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
