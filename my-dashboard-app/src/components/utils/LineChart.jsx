import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../css/LineChart.module.css";
import { LineChart as RechartsLineChart, XAxis, Tooltip, Line } from "recharts";

// LineChart component to render a line chart using Recharts
const LineChart = ({ data }) => {
  const [processedData, setProcessedData] = useState([]);

  // Effect hook to process the data for the line chart
  useEffect(() => {
    const list = data;

    // Mapping each element to assign a day abbreviation
    list?.map((e, i) => {
      switch (i) {
        case 0:
          e.day = "L"; // Lundi
          break;
        case 1:
          e.day = "M"; // Mardi
          break;
        case 2:
          e.day = "M"; // Mercredi
          break;
        case 3:
          e.day = "J"; // Jeudi
          break;
        case 4:
          e.day = "V"; // Vendredi
          break;
        case 5:
          e.day = "S"; // Samedi
          break;
        case 6:
          e.day = "D"; // Dimanche
          break;
        default:
          console.log("données inconnu");
      }
      setProcessedData(list); // Updating the state with the processed data
    });
  }, [data]);

  // Custom tooltip component for the line chart
  const CustomTooltip = ({ active, payload, label }) => {
    const tooltipValue = payload[0]?.value;
    return (
      <div className={styles.customTooltip}>
        <p>{tooltipValue}min</p>
      </div>
    );
  };

  // Rendering the line chart
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

// PropType validation for the data prop
LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
};

export default LineChart;
