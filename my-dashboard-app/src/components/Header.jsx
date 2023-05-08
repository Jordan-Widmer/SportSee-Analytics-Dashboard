// Header.js
import React from "react";
import PropTypes from "prop-types";

const Header = ({ userInfo }) => {
  const { firstName, lastName, age } = userInfo?.data?.userInfos || {};

  return (
    <header>
      <h1>Welcome to the User Dashboard</h1>
      {firstName && lastName && (
        <h2>
          {firstName} {lastName}
        </h2>
      )}
      {age && <h3>Age: {age}</h3>}
    </header>
  );
};

Header.propTypes = {
  userInfo: PropTypes.shape({
    data: PropTypes.shape({
      userInfos: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        age: PropTypes.number,
      }),
    }),
  }),
};

export default Header;
