import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ icon, title, value, unit }) => {
  return (
    <div className="card">
      <img src={icon} alt={title} className="card-icon" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">
          {value} {unit}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default Card;
