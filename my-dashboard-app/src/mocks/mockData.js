import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
  USER_DAILY_GOAL_COMPLETION,
} from "./userData";

// Utilisez l'index 0 comme exemple d'utilisateur
const exampleUser = USER_MAIN_DATA[0];

export const mockedUserInfo = {
  userId: exampleUser.id,
  firstName: exampleUser.userInfos.firstName,
  lastName: exampleUser.userInfos.lastName,
  age: exampleUser.userInfos.age,
  todayScore: exampleUser.todayScore,
  keyData: exampleUser.keyData,
};

export const mockedUserActivity = USER_ACTIVITY.find(
  (user) => user.userId === exampleUser.id
).sessions;

export const mockedUserKeyData = exampleUser.keyData;

export const mockedUserAverageSessions = USER_AVERAGE_SESSIONS.find(
  (user) => user.userId === exampleUser.id
).sessions;

export const mockedUserPerformance = USER_PERFORMANCE.find(
  (user) => user.userId === exampleUser.id
).data;

export const mockedUserDailyGoalCompletion = USER_DAILY_GOAL_COMPLETION.find(
  (user) => user.userId === exampleUser.id
).dailyGoals;
