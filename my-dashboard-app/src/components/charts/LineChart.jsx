import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./LineChart.module.css";
import {
  LineChart as RechartsLineChart,
  XAxis,
  Tooltip,
  Line,
} from "recharts";

const LineChart = ({ data }) => {
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    const list = data;

    list?.map((e, i) => {
      switch (i) {
        case 0:
          e.day = "L";
          break;
        case 1:
          e.day = "M";
          break;
        case 2:
          e.day = "M";
          break;
        case 3:
          e.day = "J";
          break;
        case 4:
          e.day = "V";
          break;
        case 5:
          e.day = "S";
          break;
        case 6:
          e.day = "D";
          break;
        default:
          console.log("données inconnu");
      }
      setProcessedData(list);
    });
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    const tooltipValue = payload[0]?.value;
    return (
      <div className={styles.customTooltip}>
        <p>{tooltipValue}min</p>
      </div>
    );
  };

  return (
    <div className={styles.linechartContainer}>
      <h3>Durée moyenne des sessions</h3>
      <RechartsLineChart width={258} height={180} data={processedData}>
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

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
};

export default LineChart;
