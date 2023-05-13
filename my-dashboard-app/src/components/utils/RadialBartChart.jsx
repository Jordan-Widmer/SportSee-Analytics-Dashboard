import React from "react";
import PropTypes from "prop-types";
import {
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  Tooltip,
} from "recharts";
import styles from "../css/RadialBartChart.module.css";

const RadialBarChartComponent = ({ data }) => {
  return (
    <div className={styles.radialProgressbarContainer}>
      <h2>Score</h2>
      {data && data.length > 0 ? (
        <RechartsRadialBarChart
          width={258}
          height={263}
          data={data}
          cx={129}
          cy={131}
          innerRadius={80}
          outerRadius={100}
          barSize={20}
        >
          <RadialBar
            minAngle={15}
            label={{ position: "insideStart", fill: "#fff" }}
            background
            clockWise={false}
            dataKey="value"
            fill="#f00"
          />
          <Tooltip />
        </RechartsRadialBarChart>
      ) : (
        <p>Loading...</p>
      )}
      <div className={styles.radialProgressbarData}>
        <h3>{data[0]?.value}%</h3>
        <p>de votre objectif</p>
      </div>
    </div>
  );
};

RadialBarChartComponent.propTypes = {
  data: PropTypes.array,
};

export default RadialBarChartComponent;
