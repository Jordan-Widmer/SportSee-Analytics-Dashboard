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
      return null;
    }
    return {
      ...userInfo,
      fullName: `${userInfo.firstName} ${userInfo.lastName}`,
      // Ajoutez ici d'autres transformations si nécessaire
    };
  }

  // Nouvelle méthode pour formater les données des sessions moyennes
  static formatAverageSessionsData(sessions) {
    if (!sessions || !Array.isArray(sessions)) {
      return [];
    }

    return sessions.map((session, index) => {
      let day;
      switch (index) {
        case 0:
          day = "L"; // Lundi
          break;
        case 1:
          day = "M"; // Mardi
          break;
        case 2:
          day = "M"; // Mercredi
          break;
        case 3:
          day = "J"; // Jeudi
          break;
        case 4:
          day = "V"; // Vendredi
          break;
        case 5:
          day = "S"; // Samedi
          break;
        case 6:
          day = "D"; // Dimanche
          break;
        default:
          console.log("Données inconnues");
      }
      return { ...session, day };
    });
  }

  // Méthode pour formater les données de performance pour le graphique radar
  // Méthode pour formater les données de performance pour le graphique radar
  static formatPerformanceData(performanceData) {
    const kind = {
      0: "cardio",
      1: "énergie",
      2: "endurance",
      3: "force",
      4: "vitesse",
      5: "intensité",
    };
    if (!performanceData || !Array.isArray(performanceData)) {
      console.error("Invalid performance data");
      return [];
    }

    return performanceData.map((data, index) => ({
      ...data,
      kind: kind[index] || "Inconnu",
    }));
  }

  static userPerformances({ data, kind }) {
    return data.map((item, index) => {
      const kindName = kind[item.kind] || `Type ${index + 1}`;
      return { name: kindName, value: item.value };
    });
  }
}

export default DataFormatter;
