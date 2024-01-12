import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Importation d'icônes pour la représentation visuelle des données.
import { FaAppleAlt, FaHamburger } from "react-icons/fa";
import { GoFlame } from "react-icons/go";
import { GiChickenLeg } from "react-icons/gi";
// Service API pour récupérer les données de l'utilisateur.
import { getUserKeyData } from "../../services/apiService";
// Styles spécifiques au composant utilisant les modules CSS.
import styles from "../css/Card.module.css";

// Composant pour afficher une carte de données spécifique (ex : Calories, Protéines, etc.).
const DataCard = ({ title, value, unit, icon, color, backgroundColor }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {/* Affichage conditionnel de l'icône, avec des styles dynamiques pour la couleur et le fond */}
        {icon && <div className={styles.icon} style={{ color: color, backgroundColor: backgroundColor }}>{icon}</div>}
        <div>
          {/* Valeur et unité des données, injectées dynamiquement */}
          <h2>
            {value} {unit}
          </h2>
          {/* Titre de la carte */}
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

// Validation des types de props pour DataCard, garantissant la robustesse du composant.
DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.string,
  icon: PropTypes.node,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

// Composant conteneur pour les DataCards, prenant l'identifiant de l'utilisateur en prop.
const Cards = ({ userId }) => {
  // État pour stocker les données de l'utilisateur, initialisé à null en attendant le chargement des données.
  const [data, setData] = useState(null);

  // Hook d'effet pour déclencher la récupération des données lorsque le composant est monté et à chaque changement de userId.
  useEffect(() => {
    const fetchData = async () => {
      // Récupération asynchrone des données clés de l'utilisateur.
      const keyData = await getUserKeyData(userId);
      // Debug : Affichage des données récupérées dans la console.
      console.log("Données clés :", keyData);
      // Mise à jour du statut avec les nouvelles données.
      setData(keyData);
    };
    fetchData();
  }, [userId]);

  return (
    <div className={styles.cardContainer}>
      {/* Affichage conditionnel des DataCards ou d'un message de chargement */}
      {data ? (
        <>
          {/* Création de DataCards avec les données utilisateur récupérées */}
          <DataCard title="Calories" value={data.calorieCount} unit="kCal" icon={<GoFlame />} color="#FF0000" backgroundColor="#FBEAEA" />
          <DataCard title="Protéines" value={data.proteinCount} unit="g" icon={<GiChickenLeg />} color="#4AB8FF" backgroundColor="#E9F4FB" />
          <DataCard title="Glucides" value={data.carbohydrateCount} unit="g" icon={<FaAppleAlt />} color="#FDCC0C" backgroundColor="#FAF6E5" />
          <DataCard title="Lipides" value={data.lipidCount} unit="g" icon={<FaHamburger />} color="#FD5181" backgroundColor="#FBEAEF" />
        </>
      ) : (
        // Message affiché pendant le chargement des données.
        <p>Chargement...</p>
      )}
    </div>
  );
};

// Validation du type pour userId, garantissant que l'utilisateur dispose d'un ID valide pour la récupération des données.
Cards.propTypes = {
  userId: PropTypes.number.isRequired,
};

// Exportation du composant Cards pour utilisation dans d'autres parties de l'application.
export default Cards;