// dataServiceFactory.js
import {getProfileInformations,getActivity, getPerformances , getAverageSessions, getDailyGoalCompletion, getKeyData} from './apiService';
import {getMockUserInfo,getMockUserActivity, getMockUserAverageSessions, getMockUserPerformance, getMockUserDailyGoalCompletion, getMockUserKeyData} from './mockService';

const useMock = false; // Utiliser des données réelles d'API

export const getUserInfo = (userId) => {
  return useMock ? getMockUserInfo(userId) : getProfileInformations(userId);
};


export const getUserActivity = (userId) => {
  return useMock ? getMockUserActivity(userId) : getActivity(userId);
};

export const getUserAverageSessions = (userId) => {
  return useMock ? getMockUserAverageSessions(userId) : getAverageSessions(userId);
};

export const getUserPerformance = (userId) => {
  return useMock ? getMockUserPerformance(userId) : getPerformances(userId);
};

export const getUserDailyGoalCompletion = (userId) => {
  return useMock ?getMockUserDailyGoalCompletion(userId) : getDailyGoalCompletion(userId);
};

export const getUserKeyData = (userId) => {
  return useMock ? getMockUserKeyData(userId) : getKeyData(userId);
}


export {default as DataFormatter} from "./DataFormatter.js"