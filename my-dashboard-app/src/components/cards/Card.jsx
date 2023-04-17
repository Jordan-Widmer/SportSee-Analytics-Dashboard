import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserKeyData } from '../../services/apiService';

const Card = ({ userId }) => {
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
    <div>
      {data ? (
        <div>
          <h2>Calories: {data.calorieCount}</h2>
          <h2>Protéines: {data.proteinCount}</h2>
          <h2>Glucides: {data.carbohydrateCount}</h2>
          <h2>Lipides: {data.lipidCount}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

Card.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Card;
