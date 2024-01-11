// Header.js
import React from "react";
import styles from "../css/Header.module.css"; // Importing the CSS file for the Header specific style

// Header component that will be used for navigation in the application
const Header = () => {
  return (
    // Using 'headerContainer' to style the main Header container
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        {/* Integration of the SportSee logo to reinforce brand identity */}
        <img src="../../../SportSee.png" alt="Logo" />
        {/* The title of the application for immediate visual recognition */}
        <h1>SportSee</h1>
      </div>
      {/* Main navigation with links to the different pages of the application */}
      <nav>
        {/* Each link leads to a different page, making it easier for the user to navigate */}
        <a href="/">Accueil</a>
        <a href="/about">Profil</a>
        <a href="/contact">Réglage</a>
        <a href="/contact">Communauté</a>
      </nav>
    </header>
  );
};

export default Header; // Exporting the Header for use in other components