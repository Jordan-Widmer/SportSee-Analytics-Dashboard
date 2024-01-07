const {
    USER_MAIN_DATA,
    USER_ACTIVITY,
    USER_AVERAGE_SESSIONS,
    USER_PERFORMANCE,
    USER_DAILY_GOAL_COMPLETION,
  } = require("./data");
  
  const getUserById = (id) =>
    USER_MAIN_DATA.filter((user) => user.id === id).shift();
  
  const getUserActivityById = (id) =>
    USER_ACTIVITY.filter((userActivity) => userActivity.userId === id).shift();
  
  const getUserAverageSession = (id) =>
    USER_AVERAGE_SESSIONS.filter((userActivity) => userActivity.userId === id).shift();
  
  const getUserPerformance = (id) =>
    USER_PERFORMANCE.filter((userPerformance) => userPerformance.userId === id).shift();
  
  const getUserDailyGoalCompletion = (id) =>
    USER_DAILY_GOAL_COMPLETION.filter((userGoal) => userGoal.userId === id).shift();
  
  module.exports = {
    getUserById,
    getUserActivityById,
    getUserAverageSession,
    getUserPerformance,
    getUserDailyGoalCompletion,
  };
  