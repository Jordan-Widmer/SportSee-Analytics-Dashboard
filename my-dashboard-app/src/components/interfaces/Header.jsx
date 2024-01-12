// Header.js
import React from "react";
import styles from "../css/Header.module.css"; // Importation du fichier CSS pour le style spécifique de l'En-tête

// Composant Header qui sera utilisé pour la navigation dans l'application
const Header = () => {
  return (
    // Utilisation de 'headerContainer' pour styliser le conteneur principal de l'En-tête
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        {/* Intégration du logo SportSee pour renforcer l'identité de la marque */}
        <img src="../../../SportSee.png" alt="Logo" />
        {/* Le titre de l'application pour une reconnaissance visuelle immédiate */}
        <h1>SportSee</h1>
      </div>
      {/* Navigation principale avec des liens vers les différentes pages de l'application */}
      <nav>
        {/* Chaque lien mène à une page différente, facilitant la navigation pour l'utilisateur */}
        <a href="/">Accueil</a>
        <a href="/about">Profil</a>
        <a href="/contact">Réglage</a>
        <a href="/contact">Communauté</a>
      </nav>
    </header>
  );
};

export default Header; // Exportation du Header pour utilisation dans d'autres composants
