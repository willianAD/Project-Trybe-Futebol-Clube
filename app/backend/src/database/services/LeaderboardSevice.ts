import LeaderboardHomeSevice from './LeaderboardHomeService';
import LeaderboardAwaySevice from './LeaderboardAwaySevice';

export default class LeaderboardSevice {
  private _serviceHome: LeaderboardHomeSevice;
  private _serviceAway: LeaderboardAwaySevice;

  constructor(serviceHome: LeaderboardHomeSevice, serviceAway: LeaderboardAwaySevice) {
    this._serviceHome = serviceHome;
    this._serviceAway = serviceAway;
  }

  async leaderboard() {
    const home = await this._serviceHome.leaderboardHome();
    const away = await this._serviceAway.leaderboardAway();
    return home.map((h) => {
      const [aways] = away.filter((a) => (h.name === a.name));
      return {
        name: h.name,
        totalPoints: h.totalPoints + aways.totalPoints,
        totalGames: h.totalGames + aways.totalGames,
        totalVictories: h.totalVictories + aways.totalVictories,
        totalDraws: h.totalDraws + aways.totalDraws,
        totalLosses: h.totalLosses + aways.totalLosses,
        goalsFavor: h.goalsFavor + aways.goalsFavor,
        goalsOwn: h.goalsOwn + aways.goalsOwn,
        goalsBalance: (h.goalsFavor + aways.goalsFavor) - (h.goalsOwn + aways.goalsOwn),
        efficiency: Number((((h.totalPoints + aways.totalPoints) / ((h.totalGames + aways
          .totalGames) * 3)) * 100).toFixed(2)),
      };
    });
  }

  async leaderboardOrder() {
    const result = await this.leaderboard();
    return result.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return 0;
    });
  }
}
