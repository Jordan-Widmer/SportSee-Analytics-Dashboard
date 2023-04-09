class UserModel {
    constructor(data) {
      this.id = data.id || null;
      this.firstName = data.firstName || '';
      this.lastName = data.lastName || '';
      this.dailyActivity = data.dailyActivity || [];
      this.averageSessions = data.averageSessions || [];
      this.performance = data.performance || [];
      this.keyMetrics = data.keyMetrics || [];
    }
  
    static fromApiData(apiData) {
      return new UserModel({
        id: apiData.id,
        firstName: apiData.firstName,
        lastName: apiData.lastName,
        dailyActivity: apiData.dailyActivity,
        averageSessions: apiData.averageSessions,
        performance: apiData.performance,
        keyMetrics: apiData.keyMetrics,
      });
    }
  }
  
  export default UserModel;
  