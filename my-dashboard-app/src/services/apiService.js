import {
  USER_MAIN_DATA as mockedUserInfo,
  USER_ACTIVITY as mockedUserActivity,
  USER_AVERAGE_SESSIONS as mockedUserAverageSessions,
  USER_PERFORMANCE as mockedUserPerformance,
  USER_DAILY_GOAL_COMPLETION as mockedUserDailyGoalCompletion,
} from '../mocks/userData';

// Utilize the mocked data to develop and test your components while waiting for integration with the API

export const getUserInfo = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockedUserInfo.find((user) => user.id === userId);
};

export const getUserKeyData = async (userId) => {
  const userInfo = await getUserInfo(userId);
  return userInfo.keyData;
};

export const getUserActivity = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockedUserActivity;
};

export const getUserAverageSessions = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockedUserAverageSessions;
};

export const getUserPerformance = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockedUserPerformance;
};

export const getUserDailyGoalCompletion = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockedUserDailyGoalCompletion;
};
