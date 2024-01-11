import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Import icons for visual representation of data.
import { FaAppleAlt, FaHamburger } from "react-icons/fa";
import { GoFlame } from "react-icons/go";
import { GiChickenLeg } from "react-icons/gi";
// API service to retrieve user data.
import { getUserKeyData } from "../../services/apiService";
// Component-specific styles using CSS Modules.
import styles from "../css/Card.module.css";

// Component to display a specific data card (eg: Calories, Proteins, etc.).
const DataCard = ({ title, value, unit, icon, color, backgroundColor }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {/* Conditional icon display, with dynamic styles for color and background */}
        {icon && <div className={styles.icon} style={{ color: color, backgroundColor: backgroundColor }}>{icon}</div>}
        <div>
          {/* Value and unit of the data, dynamically injected */}
          <h2>
            {value} {unit}
          </h2>
          {/* Card title */}
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

// Validation of prop types for DataCard, ensuring the robustness of the component.
DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.string,
  icon: PropTypes.node,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

// Container component for DataCards, taking the user identifier as prop.
const Cards = ({ userId }) => {
  // State to store user data, initialized to null while waiting for data to load.
  const [data, setData] = useState(null);

  // Effect hook to trigger data retrieval when the component is raised and each userId change.
  useEffect(() => {
    const fetchData = async () => {
      // Asynchronous retrieval of key user data.
      const keyData = await getUserKeyData(userId);
      // Debug: Display of recovered data in the console.
      console.log("Key Data:", keyData);
      // Status update with new data.
      setData(keyData);
    };
    fetchData();
  }, [userId]);

  return (
    <div className={styles.cardContainer}>
      {/* Conditionally displaying DataCards or a loading message */}
      {data ? (
        <>
          {/* Creation of DataCards with retrieved user data */}
          <DataCard title="Calories" value={data.calorieCount} unit="kCal" icon={<GoFlame />} color="#FF0000" backgroundColor="#FBEAEA" />
          <DataCard title="Protéines" value={data.proteinCount} unit="g" icon={<GiChickenLeg />} color="#4AB8FF" backgroundColor="#E9F4FB" />
          <DataCard title="Glucides" value={data.carbohydrateCount} unit="g" icon={<FaAppleAlt />} color="#FDCC0C" backgroundColor="#FAF6E5" />
          <DataCard title="Lipides" value={data.lipidCount} unit="g" icon={<FaHamburger />} color="#FD5181" backgroundColor="#FBEAEF" />
        </>
      ) : (
        // Message displayed while loading data.
        <p>Loading...</p>
      )}
    </div>
  );
};

// Type validation for userId, ensuring the user has a valid ID for data retrieval.
Cards.propTypes = {
  userId: PropTypes.number.isRequired,
};

// Exporting the Cards component for use in other parts of the application.
export default Cards;