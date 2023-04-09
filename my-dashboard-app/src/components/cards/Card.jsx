import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserKeyData } from '../../services/apiService';
import UserModel from '../../models/UserModel';

const Card = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getUserKeyData(userId);
        const userModel = new UserModel(fetchedData);
        setData(userModel.getKeyData());
      } catch (error) {
        console.error('Error fetching user key data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {data ? (
        <div>
          {/* Affichez les informations clés ici */}
          <h2>Calories: {data.calories}</h2>
          <h2>Protéines: {data.proteins}</h2>
          <h2>Glucides: {data.carbohydrates}</h2>
          <h2>Lipides: {data.lipids}</h2>
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
