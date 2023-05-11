import React from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.iconsList}>
        <span>
          <i className="fa-solid fa-person-walking"></i>
        </span>
        <span>
          <i className="fa-solid fa-person-swimming"></i>
        </span>
        <span>
          <i className="fa-solid fa-person-biking"></i>
        </span>
        <span>
          <i
            className="fa-solid fa-dumbbell"
            style={{ transform: "rotate(45deg)" }}
          ></i>
        </span>
      </div>
      <p>Copiryght, SportSee 2020</p>
    </div>
  );
}
