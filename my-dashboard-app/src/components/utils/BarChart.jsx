import React, { useRef, useEffect } from "react";
import styles from "../css/BarChart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaCircle } from "react-icons/fa";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles["custom-tooltip"]}>
        <p className={styles["label"]}>{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

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

const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;

  return (
    <path
      d={`M${x},${y + 6} a6,6 0 0 1 6,-6 h${width - 12} a6,6 0 0 1 6,6 v${
        height - 6
      } h${-width}z`}
      style={{ fill }}
    />
  );
};

const BarChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      console.log(
        "BarChart container dimensions:",
        chartRef.current.getBoundingClientRect()
      );
    }
  }, [chartRef]);

  console.log("BarChart data:", data);

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
      {renderLegend()}
      <div ref={chartRef} style={{ width: "100%", height: 300 }}>
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
