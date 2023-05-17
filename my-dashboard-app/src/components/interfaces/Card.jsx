import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaAppleAlt, FaHamburger } from "react-icons/fa";
import { GoFlame } from "react-icons/go";
import { GiChickenLeg } from "react-icons/gi";
import { getUserKeyData } from "../../services/apiService";
import styles from "../css/Card.module.css";

const DataCard = ({ title, value, unit, icon, color, backgroundColor }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {icon && <div className={styles.icon} style={{ color: color, backgroundColor: backgroundColor }}>{icon}</div>}
        <div>
          <h2>
            {value} {unit}
          </h2>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.string,
  icon: PropTypes.node,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

const Cards = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const keyData = await getUserKeyData(userId);
      console.log("Key Data:", keyData);
      setData(keyData);
    };
    fetchData();
  }, [userId]);

  return (
    <div className={styles.cardContainer}>
      {data ? (
        <>
          <DataCard title="Calories" value={data.calorieCount} unit="kCal" icon={<GoFlame />} color="#FF0000" backgroundColor="#FBEAEA" />
          <DataCard title="Protéines" value={data.proteinCount} unit="g" icon={<GiChickenLeg />} color="#4AB8FF" backgroundColor="#E9F4FB" />
          <DataCard title="Glucides" value={data.carbohydrateCount} unit="g" icon={<FaAppleAlt />} color="#FDCC0C" backgroundColor="#FAF6E5" />
          <DataCard title="Lipides" value={data.lipidCount} unit="g" icon={<FaHamburger />} color="#FD5181" backgroundColor="#FBEAEF" />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

Cards.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Cards;
