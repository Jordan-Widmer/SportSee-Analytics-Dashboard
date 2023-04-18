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
  console.log('userInfo:', userInfo);
  return userInfo.data.keyData;
};

export const getUserActivity = async (userId) => {
  const response = await axios.get(`${apiURL}/user/${userId}/activity`);
  return response.data;
};

export async function getUserAverageSessions(userId) {
  try {
    const response = await axios.get(`${apiURL}/user/${userId}/average-sessions`);
    console.log('response:', response);
    const sessionsData = response.data.sessions;
    console.log('sessionsData:', sessionsData);

    if (!sessionsData || !Array.isArray(sessionsData)) {
      console.error("Error fetching user average sessions: sessions data is missing");
      return [];
    }

    const data = sessionsData.map(session => ({
      name: `Day ${session.day}`,
      value: session.sessionLength,
    }));

    return data;
  } catch (error) {
    console.error('Error fetching user average sessions:', error);
    return [];
  }
}

export const getUserPerformance = async (userId) => {
  const response = await axios.get(`${apiURL}/user/${userId}/performance`);
  return response.data;
};

export const getUserDailyGoalCompletion = async (userId) => {
  try {
    const response = await axios.get(`${apiURL}/user/${userId}/daily-goal-completion`);
    const dailyGoals = response.data.data.dailyGoals;

    console.log('Fetched dailyGoals:', dailyGoals);

    const formattedData = dailyGoals.map((goal, index) => {
      const formattedGoal = {
        name: `Day ${index + 1}`,
        value: goal.goalCompleted ? 100 : 0,
      };
      console.log('Formatted goal:', formattedGoal);
      return formattedGoal;
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching user daily goal completion data:', error);
    return null;
  }
};

