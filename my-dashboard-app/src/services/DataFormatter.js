class DataFormatter {
  // Formate les données de session pour les graphiques
  // Convertit les sessions en un format utilisable par les composants graphiques
  static formatSessionsData(sessions) {
    if (!sessions || !Array.isArray(sessions)) {
      console.error("Invalid session data");
      return [];
    }
    return sessions.map((session) => ({
      name: `Jour ${session.day}`,
      value: session.sessionLength,
    }));
  }

  // Formate les données des objectifs quotidiens
  // Transforme les objectifs quotidiens en un format plus lisible
  static formatDailyGoalsData(dailyGoals) {
    if (!dailyGoals || !Array.isArray(dailyGoals)) {
      console.error("Invalid daily goals data");
      return [];
    }
    return dailyGoals.map((goal, index) => ({
      name: `Jour ${index + 1}`,
      value: goal.goalCompleted ? 100 : 0,
    }));
  }

  // Formate les données de performance de l'utilisateur
  // Adapte les données de performance pour une utilisation dans des graphiques ou des visualisations
  static formatUserPerformance(performanceData) {
    if (!performanceData || !performanceData.data || !performanceData.kind) {
      console.error("Invalid performance data");
      return [];
    }
    return performanceData.data.map((item, index) => ({
      name: performanceData.kind[index + 1],
      value: item,
    }));
  }

  // Formate les informations clés de l'utilisateur
  // Crée un objet utilisateur avec des propriétés supplémentaires ou modifiées pour une utilisation pratique
  static formatUserInfo(userInfo) {
    if (!userInfo) {
      console.error("Invalid user info data");
      return null;
    }
    return {
      ...userInfo,
      fullName: `${userInfo.firstName} ${userInfo.lastName}`,
      // Ajoutez ici d'autres transformations si nécessaire
    };
  }
}

export default DataFormatter;
