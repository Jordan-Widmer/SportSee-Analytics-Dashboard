// Importation des composants et hooks React nécessaires
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Importation des composants personnalisés pour l'interface utilisateur
import Header from "./components/interfaces/Header";
import Sidebar from "./components/interfaces/Sidebar";
import BarChartComponent from "./components/utils/BarChart";
import RadialBarChartComponent from "./components/utils/RadialBartChart";
import LineChart from "./components/utils/LineChart";
import PerformanceChart from "./components/utils/RadarChart";

// Hook personnalisé pour récupérer les données de l'utilisateur
import useFetchUserData from "./hooks/useFetchUserData";

// Composants supplémentaires de l'interface utilisateur
import Card from "./components/interfaces/Card";

// CSS pour l'application
import "./index.css";

function App() {
  // ID utilisateur statique pour la démonstration ; à remplacer par des données dynamiques dans une vraie application
  const userId = 12;

  // État pour stocker les données du graphique radial
  const [radialChartData, setRadialChartData] = useState([]);

  // Hook d'effet pour récupérer les données des tâches de l'utilisateur
  useEffect(() => {
    // Récupération des tâches pour l'utilisateur spécifié
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then((response) => response.json())
      .then((data) => {
        // Calcul des tâches complétées et non complétées
        const completed = data.filter((item) => item.completed).length;
        const notCompleted = data.length - completed;

        // Définition des données du graphique radial
        setRadialChartData([
          { name: "Complétées", completion: completed },
          { name: "Non Complétées", completion: notCompleted },
        ]);
      })
      .catch((error) => console.log(error));
  }, [userId]); // Tableau de dépendances pour réexécuter l'effet lorsque userId change

  // Récupération de données utilisateur supplémentaires en utilisant un hook personnalisé
  const {
    userInfo,
    userActivity,
    userAverageSessions,
    userPerformanceData,
    goalCompletionData,
  } = useFetchUserData(userId);

  // Destructuration des informations utilisateur pour un accès facile
  const { firstName, lastName, age } = userInfo?.data?.userInfos || {};

  // Transformation des données de performance pour le graphique
  const transformedPerformanceData = userPerformanceData
    ? userPerformanceData.data.map((item, index) => ({
        name: userPerformanceData.kind.name + (index + 1),
        value: item.value,
      }))
    : null;

  // Données statiques à des fins de démonstration
  const data = [{ name: "Objectif", value: 75 }];

  // JSX pour afficher l'interface utilisateur de l'application
  return (
    <div className="App">
      <Header />
      <div className="contentWrapper">
        <Sidebar />
        <div className="dashboardContent">
          <div className="profileContainer">
            <h1>
              Bienvenue <span>{firstName} {lastName}</span>
            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier👏</p>
          </div>
          {/* Affichage du graphique en barres avec les données d'activité de l'utilisateur ou message de chargement */}
          {userActivity ? (
            <BarChartComponent data={Object.values(userActivity)} />
          ) : (
            <p>Chargement de l'activité de l'utilisateur...</p>
          )}
          <div className="secChartContainer">
            {/* Affichage du graphique en ligne avec les données de session de l'utilisateur ou message de chargement */}
            {userAverageSessions ? (
              <LineChart data={userAverageSessions} />
            ) : (
              <p>Chargement des sessions moyennes...</p>
            )}
            {/* Affichage du graphique de performance avec les données transformées ou message de chargement */}
            {transformedPerformanceData ? (
              <PerformanceChart data={transformedPerformanceData} />
            ) : (
              <p>Chargement des données de performance...</p>
            )}
            <RadialBarChartComponent data={data} />
          </div>
        </div>
        <div className="cardContainer">
          {/* Passage de userId au composant Card */}
          <Card userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default App;
