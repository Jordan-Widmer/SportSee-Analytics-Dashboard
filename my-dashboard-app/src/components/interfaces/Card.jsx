import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getUserKeyData } from "../../services/apiService";
import styles from "../css/Card.module.css";

const DataCard = ({ title, value }) => {
  return (
    <div className={styles.card}>
      <h2>
        {title}: {value}
      </h2>
    </div>
  );
};

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
          <DataCard title="Calories" value={data.calorieCount} />
          <DataCard title="Protéines" value={data.proteinCount} />
          <DataCard title="Glucides" value={data.carbohydrateCount} />
          <DataCard title="Lipides" value={data.lipidCount} />
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
