import MatcheService from './MatcheService';
import Matche from '../models/Matche';
import TeamService from './TeamService';
import Team from '../models/Team';
import IMatchesTeamsAway from '../interfaces/IMatchesTeamsAway';

export default class LeaderboardSevice {
  private _service: MatcheService;

  constructor(service: MatcheService) {
    this._service = service;
  }

  async leaderboardAway() {
    const teams = await new TeamService(Team).getAllTeams();
    const matches = await this._service.getProgressMatches(false) as IMatchesTeamsAway[];

    const result = teams.map((e) => matches.filter((m) => +e.id === +m.awayTeamId));
    return result.map((e, i) => ({ name: teams[i].teamName,
      totalPoints: e.reduce(LeaderboardSevice.totalPoint, 0),
      totalGames: result[i].length,
      totalVictories: e.reduce(LeaderboardSevice.totalVictories, 0),
      totalDraws: e.reduce(LeaderboardSevice.totalDraws, 0),
      totalLosses: e.reduce(LeaderboardSevice.totalLosses, 0),
      goalsFavor: e.reduce(LeaderboardSevice.goalsFavor, 0),
      goalsOwn: e.reduce(LeaderboardSevice.goalsOwn, 0),
      goalsBalance: (e
        .reduce(LeaderboardSevice.goalsFavor, 0) - e.reduce(LeaderboardSevice.goalsOwn, 0)),
      efficiency: Number(((e
        .reduce(LeaderboardSevice.totalPoint, 0) / (result[i].length * 3)) * 100).toFixed(2)),
    }));
  }

  async leaderboardFilter() {
    const result = await this.leaderboardAway();
    return result.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return 0;
    });
  }

  static totalPoint(acc: number, cur: Matche) {
    if (cur.awayTeamGoals > cur.homeTeamGoals) return acc + 3;
    if (cur.awayTeamGoals === cur.homeTeamGoals) return acc + 1;
    return acc;
  }

  static totalVictories(acc: number, cur: Matche) {
    if (cur.awayTeamGoals > cur.homeTeamGoals) return acc + 1;
    return acc;
  }

  static totalDraws(acc: number, cur: Matche) {
    if (cur.awayTeamGoals === cur.homeTeamGoals) return acc + 1;
    return acc;
  }

  static totalLosses(acc: number, cur: Matche) {
    if (cur.awayTeamGoals < cur.homeTeamGoals) return acc + 1;
    return acc;
  }

  static goalsFavor(acc: number, cur: Matche) {
    return cur.awayTeamGoals + acc;
  }

  static goalsOwn(acc: number, cur: Matche) {
    return cur.homeTeamGoals + acc;
  }
}
