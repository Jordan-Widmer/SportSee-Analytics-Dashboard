import axios from 'axios';

const apiURL = 'http://localhost:3000'; // Remplacez par l'URL de votre backend

export const getUserInfo = async (userId) => {
  try {
    const response = await axios.get(`${apiURL}/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("User not found");
      return null;
    } else {
      console.error("Error fetching user info:", error);
      return null;
    }
  }
};

export const getUserKeyData = async (userId) => {
  const userInfo = await getUserInfo(userId);
  return userInfo.keyData;
};

export const getUserActivity = async (userId) => {
  const response = await axios.get(`${apiURL}/user/${userId}/activity`);
  return response.data;
};

export const getUserAverageSessions = async (userId) => {
  const response = await axios.get(`${apiURL}/user/${userId}/average-sessions`);
  return response.data;
};

export const getUserPerformance = async (userId) => {
  const response = await axios.get(`${apiURL}/user/${userId}/performance`);
  return response.data;
};

export const getUserDailyGoalCompletion = async (userId) => {
  try {
    const response = await axios.get(`${apiURL}/user/${userId}/daily-goal-completion`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user daily goal completion data:', error);
    return null;
  }
};

