import axios from 'axios';

const API_BASE_URL = 'https://example-api.com'; // Remplacez par l'URL de base de votre API

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const getUserInfo = async (userId) => {
  try {
    const response = await apiService.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const getUserActivity = async (userId) => {
  try {
    const response = await apiService.get(`/user/${userId}/activity`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user activity:', error);
    throw error;
  }
};

export const getAverageSessions = async (userId) => {
  try {
    const response = await apiService.get(`/user/${userId}/average-sessions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching average sessions:', error);
    throw error;
  }
};

export const getDailyObjectiveCompletion = async (userId) => {
  try {
    const response = await apiService.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching daily objective completion:', error);
    throw error;
  }
};

export const getActivityTypes = async (userId) => {
  try {
    const response = await apiService.get(`/user/${userId}/performance`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity types:', error);
    throw error;
  }
};

export const getKeyFigures = async (userId) => {
  try {
    const response = await apiService.get(`/user/${userId}/activity`);
    return response.data;
  } catch (error) {
    console.error('Error fetching key figures:', error);
    throw error;
  }
};

export default apiService;
