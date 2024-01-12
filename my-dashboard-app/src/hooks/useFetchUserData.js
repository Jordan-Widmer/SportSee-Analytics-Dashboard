// Importation des hooks React
import { useState, useEffect } from "react";

// Importation des fonctions de service API
import {
  getUserInfo,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
  getUserDailyGoalCompletion,
} from "../services/apiService";

// Hook personnalisé pour récupérer et gérer les données de l'utilisateur
const useFetchUserData = (userId) => {
  // Hooks d'état pour stocker différents aspects des données de l'utilisateur
  const [userInfo, setUserInfo] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformanceData, setUserPerformanceData] = useState(null);
  const [userDailyGoalCompletion, setUserDailyGoalCompletion] = useState(null);
  const [goalCompletionData, setGoalCompletionData] = useState([]);

  // Hook d'effet pour récupérer les données lorsque userId change
  useEffect(() => {
    // Fonction asynchrone pour récupérer les données utilisateur depuis différents points de terminaison
    const fetchData = async () => {
      try {
        // Récupération des informations de l'utilisateur et mise à jour de l'état
        const userInfoData = await getUserInfo(userId);
        setUserInfo(userInfoData);

        // Récupération des données d'activité de l'utilisateur
        const userActivityData = await getUserActivity(userId);
        setUserActivity(userActivityData);

        // Récupération des données des sessions moyennes de l'utilisateur
        const userAverageSessionsData = await getUserAverageSessions(userId);
        setUserAverageSessions(userAverageSessionsData);

        // Récupération des données de performance de l'utilisateur
        const userPerformanceData = await getUserPerformance(userId);
        setUserPerformanceData(userPerformanceData.data);

        // Récupération des données de réalisation des objectifs quotidiens de l'utilisateur
        const goalCompletionData = await getUserDailyGoalCompletion(userId);
        setGoalCompletionData(goalCompletionData);
      } catch (error) {
        // Gestion des erreurs et définition de l'état par défaut en cas d'échec de la récupération
        console.error("Erreur lors de la récupération des données de réalisation des objectifs quotidiens de l'utilisateur :", error);
        setGoalCompletionData([]); // Définition des données à un tableau vide en cas d'erreur
      }
    };

    // Invocation de la fonction fetchData
    fetchData();
  }, [userId]); // Tableau de dépendances avec userId pour réexécuter l'effet lorsque userId change

  // Retour des données récupérées pour qu'elles puissent être utilisées par les composants
  return {
    userInfo,
    userActivity,
    userAverageSessions,
    userPerformanceData,
    goalCompletionData,
  };
};

// Exportation du hook personnalisé pour utilisation dans d'autres composants
export default useFetchUserData;
