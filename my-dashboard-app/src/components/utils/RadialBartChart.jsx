import React from "react";
import PropTypes from "prop-types";
import {
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  Tooltip,
  PolarAngleAxis
} from "recharts";
import styles from "../css/RadialBartChart.module.css";

const RadialBarChartComponent = ({ data }) => {
  return (
    <div className={styles.radialProgressbarContainer}>
      <h2>Score</h2>
      {data && data.length > 0 ? (
        <RechartsRadialBarChart
          width={208}
          height={263}
          data={data}
          cx={109}
          cy={131}
          innerRadius={80}
          outerRadius={100}
          barSize={20}
        >
          <PolarAngleAxis 
            type="number" 
            domain={[0, 100]} 
            angleAxisId={0} 
            tick={false} 
          />
          <RadialBar
            minAngle={15}
            label={{ position: "insideStart", fill: "#fff" }}
            background
            clockWise={true}
            dataKey="value"
            angleAxisId={0}
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
