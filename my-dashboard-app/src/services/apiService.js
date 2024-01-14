import axios from "axios";
import DataFormatter from "./DataFormatter"; 

const apiURL = "http://localhost:3000"; 


export const getProfileInformations = async (userId) => {

  const userInfos = {
    firstName : "",
    lastName : "",
    age : ""
  }

  let response;
  try {

  response = await axios.get(`${apiURL}/user/${userId}`);

  } catch (error) {
      console.error(errorl)
  }
  const infos = response.data.data

  if(!infos){
    return userInfos
  } 

  
    return Object.assign(userInfos, infos.keyData, infos.userInfos)


};


export const getKeyData = async (userId) => {
    return Object.assign({
      calorieCount :0,
      carbohydrateCount :0,
      lipidCount :0,
      proteinCount : 0,
    }, await getProfileInformations(userId))
    

};


export const getActivity = async (userId) => {
  const response = await axios.get(`${apiURL}/user/${userId}/activity`);
  return response.data; 
};


export async function getAverageSessions(userId) {
  try {
    const response = await axios.get(`${apiURL}/user/${userId}/average-sessions`);
    
    return DataFormatter.formatSessionsData(response.data.sessions);
  } catch (error) {
    console.error("Erreur lors de la récupération des sessions moyennes de l'utilisateur :", error);
    return [];
  }
}


export const getPerformances = async (userId) => {
  const response = await axios.get(`${apiURL}/user/${userId}/performance`);
  return response.data.data; 
};


export const getDailyGoalCompletion = async (userId) => {
  try {
    const response = await axios.get(`${apiURL}/user/${userId}/daily-goal-completion`);
  
    return DataFormatter.formatDailyGoalsData(response.data.data.dailyGoals);
  } catch (error) {
    console.error("Erreur lors de la récupération des données de réalisation des objectifs quotidiens de l'utilisateur :", error);
    return null;
  }
};
