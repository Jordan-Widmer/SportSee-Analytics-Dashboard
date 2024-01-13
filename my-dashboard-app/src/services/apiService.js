import axios from "axios";
import DataFormatter from "./DataFormatter"; // Importation de la classe de formatage des données

const apiURL = "http://localhost:3000"; // URL de base pour les requêtes API

// Récupère les informations de l'utilisateur depuis l'API
export const getUserInfo = async (userId) => {
  try {
    // Envoie une requête GET pour obtenir les infos de l'utilisateur
    const response = await axios.get(`${apiURL}/user/${userId}`);
    return response.data; // Retourne les données de l'utilisateur
  } catch (error) {
    // Gestion des erreurs, notamment si l'utilisateur n'est pas trouvé
    if (error.response && error.response.status === 404) {
      console.error("Utilisateur non trouvé");
      return null;
    } else {
      console.error("Erreur lors de la récupération des infos de l'utilisateur :", error);
      return null;
    }
  }
};

// Récupère les données clés de l'utilisateur
export const getUserKeyData = async (userId) => {
  const userInfo = await getUserInfo(userId); // Utilise getUserInfo pour obtenir les informations
  console.log("userInfo :", userInfo);
  return userInfo.data.keyData; // Retourne uniquement les données clés de l'utilisateur
};

// Récupère les données d'activité de l'utilisateur
export const getUserActivity = async (userId) => {
  const response = await axios.get(`${apiURL}/user/${userId}/activity`);
  return response.data; // Retourne les données d'activité de l'utilisateur
};

// Récupère et formate la durée moyenne des sessions de l'utilisateur
export async function getUserAverageSessions(userId) {
  try {
    const response = await axios.get(`${apiURL}/user/${userId}/average-sessions`);
    // Utilise DataFormatter pour formater les données de session
    return DataFormatter.formatSessionsData(response.data.sessions);
  } catch (error) {
    console.error("Erreur lors de la récupération des sessions moyennes de l'utilisateur :", error);
    return [];
  }
}

// Récupère les données de performance de l'utilisateur
export const getUserPerformance = async (userId) => {
  const response = await axios.get(`${apiURL}/user/${userId}/performance`);
  return response.data; // Retourne les données de performance
};

// Récupère et formate les données de réalisation des objectifs quotidiens de l'utilisateur
export const getUserDailyGoalCompletion = async (userId) => {
  try {
    const response = await axios.get(`${apiURL}/user/${userId}/daily-goal-completion`);
    // Utilise DataFormatter pour formater les données des objectifs quotidiens
    return DataFormatter.formatDailyGoalsData(response.data.data.dailyGoals);
  } catch (error) {
    console.error("Erreur lors de la récupération des données de réalisation des objectifs quotidiens de l'utilisateur :", error);
    return null;
  }
};
