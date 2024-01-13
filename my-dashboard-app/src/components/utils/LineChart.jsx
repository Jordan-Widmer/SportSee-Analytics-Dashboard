import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../css/LineChart.module.css";
import { LineChart as RechartsLineChart, XAxis, Tooltip, Line } from "recharts";
import DataFormatter from "../../services/DataFormatter"; // Assurez-vous que le chemin d'accès est correct

// Composant LineChart pour afficher un graphique en ligne avec Recharts
const LineChart = ({ data }) => {
  const [processedData, setProcessedData] = useState([]);

  // Utilisation de DataFormatter pour traiter les données pour le graphique en ligne
  useEffect(() => {
    setProcessedData(DataFormatter.formatAverageSessionsData(data));
  }, [data]);

  // Composant personnalisé d'infobulle pour le graphique en ligne
  const CustomTooltip = ({ active, payload, label }) => {
    const tooltipValue = payload[0]?.value;
    return (
      <div className={styles.customTooltip}>
        <p>{tooltipValue}min</p>
      </div>
    );
  };

  // Rendu du graphique en ligne
  return (
    <div className={styles.linechartContainer}>
      <h3>Durée moyenne des sessions</h3>
      <RechartsLineChart width={208} height={180} data={processedData}>
        <XAxis
          tick={{ fill: "white" }}
          padding={{ left: 10, right: 10 }}
          tickLine={{ stroke: "transparent" }}
          axisLine={{ stroke: "transparent" }}
          dataKey="day"
        />
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          content={<CustomTooltip />}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="white"
          dot={false}
          strokeWidth={3}
          activeDot={{ stroke: "grey", strokeWidth: 2, r: 6 }}
        />
      </RechartsLineChart>
    </div>
  );
};

// Validation des PropTypes
LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      day: PropTypes.string
    })
  ),
};

export default LineChart;
