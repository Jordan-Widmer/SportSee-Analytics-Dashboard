import mockData from "../mocks/mockData.json";


const userData =(userId) => {
  const userData = mockData.USER_MAIN_DATA.find((user) => user.id === userId)

  const user = {
    firstName : "",
    lastName : "",
    age :""
  }

  return Object.assign(user, userData, userData.userInfos, userData.keyData)
}


export const getMockUserInfo = (userId) => {
 
  return Promise.resolve(userData(userId));
};


export const getMockUserKeyData = (userId) => {
  const keyData = {
    calorieCount :0,
    carbohydrateCount :0,
    lipidCount :0,
    proteinCount : 0,
  }
  
  return Promise.resolve(Object.assign(keyData, userData(userId)))

}

export const getMockUserActivity = (userId) => Promise.resolve([mockData.USER_ACTIVITY.find((activity) => activity.userId === userId)]);

// const getMockUserActivity =(userId) => mockData.USER_AVERAGE_SESSIONS.find((session) => session.userId === userId);


export const getMockUserAverageSessions = (userId) => {
  const { sessions } = mockData.USER_AVERAGE_SESSIONS.find(
    (session) => session.userId === userId
  );

  return Promise.resolve(sessions.map(({day, sessionLength}) =>({name : `day${day}`, value: sessionLength})));

};

export const getMockUserPerformance = (userId) => {
  const performanceData = mockData.USER_PERFORMANCE.find(
      (performance) => performance.userId === userId
    ) 
  return Promise.resolve(performanceData);
};

export const getMockUserDailyGoalCompletion = (userId) => {
  const goalData =
    mockData.USER_DAILY_GOAL_COMPLETION.find(
      (goal) => goal.userId === userId
    ) || {};
  return Promise.resolve(goalData);
};
