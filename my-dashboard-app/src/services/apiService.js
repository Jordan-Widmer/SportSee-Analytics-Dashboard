import axios from "axios";

// Base URL for the API. Replace with the URL of your backend.
const apiURL = "http://localhost:3000";

// Function to fetch user information
export const getUserInfo = async (userId) => {
  try {
    // Making a GET request to the API to fetch user information
    const response = await axios.get(`${apiURL}/user/${userId}`);
    // Returning the fetched data
    return response.data;
  } catch (error) {
    // Handling errors, particularly if the user is not found
    if (error.response && error.response.status === 404) {
      console.error("User not found");
      return null;
    } else {
      console.error("Error fetching user info:", error);
      return null;
    }
  }
};

// Function to fetch key data for a user
export const getUserKeyData = async (userId) => {
  // Using the getUserInfo function to get the user's key data
  const userInfo = await getUserInfo(userId);
  console.log("userInfo:", userInfo);
  // Returning the key data part of the user information
  return userInfo.data.keyData;
};

// Function to fetch user activity data
export const getUserActivity = async (userId) => {
  // Fetching user activity data using a GET request
  const response = await axios.get(`${apiURL}/user/${userId}/activity`);
  return response.data;
};

// Function to fetch average session lengths for a user
export async function getUserAverageSessions(userId) {
  try {
    // Fetching average session data
    const response = await axios.get(
      `${apiURL}/user/${userId}/average-sessions`
    );
    console.log("response:", response);
    const sessionsData = response.data.sessions;
    console.log("sessionsData:", sessionsData);

    // Validating and transforming the fetched data
    if (!sessionsData || !Array.isArray(sessionsData)) {
      console.error(
        "Error fetching user average sessions: sessions data is missing"
      );
      return [];
    }

    // Mapping the data to a format suitable for charting
    const data = sessionsData.map((session) => ({
      name: `Day ${session.day}`,
      value: session.sessionLength,
    }));

    return data;
  } catch (error) {
    // Handling errors and returning an empty array in case of failure
    console.error("Error fetching user average sessions:", error);
    return [];
  }
}

// Function to fetch user performance data
export const getUserPerformance = async (userId) => {
  // Fetching user performance data
  const response = await axios.get(`${apiURL}/user/${userId}/performance`);
  return response.data;
};

// Function to fetch daily goal completion data for a user
export const getUserDailyGoalCompletion = async (userId) => {
  try {
    // Fetching daily goal completion data
    const response = await axios.get(
      `${apiURL}/user/${userId}/daily-goal-completion`
    );
    const dailyGoals = response.data.data.dailyGoals;

    console.log("Fetched dailyGoals:", dailyGoals);

    // Formatting the fetched data for easier consumption
    const formattedData = dailyGoals.map((goal, index) => {
      const formattedGoal = {
        name: `Day ${index + 1}`,
        value: goal.goalCompleted ? 100 : 0,
      };
      console.log("Formatted goal:", formattedGoal);
      return formattedGoal;
    });

    return formattedData;
  } catch (error) {
    // Handling errors and returning null in case of failure
    console.error("Error fetching user daily goal completion data:", error);
    return null;
  }
};
