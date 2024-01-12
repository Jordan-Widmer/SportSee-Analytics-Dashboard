import axios from "axios";

// URL de base pour l'API. Remplacez par l'URL de votre backend.
const apiURL = "http://localhost:3000";

// Fonction pour récupérer les informations de l'utilisateur
export const getUserInfo = async (userId) => {
  try {
    // Envoi d'une requête GET à l'API pour récupérer les informations de l'utilisateur
    const response = await axios.get(`${apiURL}/user/${userId}`);
    // Retour des données récupérées
    return response.data;
  } catch (error) {
    // Gestion des erreurs, en particulier si l'utilisateur n'est pas trouvé
    if (error.response && error.response.status === 404) {
      console.error("Utilisateur non trouvé");
      return null;
    } else {
      console.error("Erreur lors de la récupération des infos de l'utilisateur :", error);
      return null;
    }
  }
};

// Fonction pour récupérer les données clés d'un utilisateur
export const getUserKeyData = async (userId) => {
  // Utilisation de la fonction getUserInfo pour obtenir les données clés de l'utilisateur
  const userInfo = await getUserInfo(userId);
  console.log("userInfo :", userInfo);
  // Retour de la partie des données clés des informations de l'utilisateur
  return userInfo.data.keyData;
};

// Fonction pour récupérer les données d'activité de l'utilisateur
export const getUserActivity = async (userId) => {
  // Récupération des données d'activité de l'utilisateur avec une requête GET
  const response = await axios.get(`${apiURL}/user/${userId}/activity`);
  return response.data;
};

// Fonction pour récupérer la durée moyenne des sessions d'un utilisateur
export async function getUserAverageSessions(userId) {
  try {
    // Récupération des données de session moyenne
    const response = await axios.get(
      `${apiURL}/user/${userId}/average-sessions`
    );
    console.log("réponse :", response);
    const sessionsData = response.data.sessions;
    console.log("sessionsData :", sessionsData);

    // Validation et transformation des données récupérées
    if (!sessionsData || !Array.isArray(sessionsData)) {
      console.error(
        "Erreur lors de la récupération des sessions moyennes de l'utilisateur : données de sessions manquantes"
      );
      return [];
    }

    // Mappage des données dans un format adapté pour les graphiques
    const data = sessionsData.map((session) => ({
      name: `Jour ${session.day}`,
      value: session.sessionLength,
    }));

    return data;
  } catch (error) {
    // Gestion des erreurs et retour d'un tableau vide en cas d'échec
    console.error("Erreur lors de la récupération des sessions moyennes de l'utilisateur :", error);
    return [];
  }
}

// Fonction pour récupérer les données de performance de l'utilisateur
export const getUserPerformance = async (userId) => {
  // Récupération des données de performance de l'utilisateur
  const response = await axios.get(`${apiURL}/user/${userId}/performance`);
  return response.data;
};

// Fonction pour récupérer les données de réalisation des objectifs quotidiens de l'utilisateur
export const getUserDailyGoalCompletion = async (userId) => {
  try {
    // Récupération des données de réalisation des objectifs quotidiens
    const response = await axios.get(
      `${apiURL}/user/${userId}/daily-goal-completion`
    );
    const dailyGoals = response.data.data.dailyGoals;

    console.log("Objectifs quotidiens récupérés :", dailyGoals);

    // Formatage des données récupérées pour une consommation plus facile
    const formattedData = dailyGoals.map((goal, index) => {
      const formattedGoal = {
        name: `Jour ${index + 1}`,
        value: goal.goalCompleted ? 100 : 0,
      };
      console.log("Objectif formaté :", formattedGoal);
      return formattedGoal;
    });

    return formattedData;
  } catch (error) {
    // Gestion des erreurs et retour de null en cas d'échec
    console.error("Erreur lors de la récupération des données de réalisation des objectifs quotidiens de l'utilisateur :", error);
    return null;
  }
};
