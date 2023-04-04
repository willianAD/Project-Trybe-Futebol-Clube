import MatcheService from './MatcheService';
import Matche from '../models/Matche';
import TeamService from './TeamService';
import Team from '../models/Team';

// interface IMatchesTeamsAway extends Matche {
//   awayTeam: {
//     id: number,
//     teamName: string,
//   }
// }

interface IMatchesTeamsHome extends Matche {
  homeTeam: {
    id: number,
    teamName: string,
  }
}

export default class LeaderboardSevice {
  private _service: MatcheService;

  constructor(service: MatcheService) {
    this._service = service;
  }

  // async leaderboardAways() {
  //   const teams = await new TeamService(Team).getAllTeams();
  //   const matches = await this._service.getProgressMatches(false) as IMatchesTeamsAway[];

  //   const result = teams.map((e) => matches.filter((m) => +e.id === +m.awayTeamId));
  //   return result.map((e, i) => ({ name: teams[i].teamName,
  //     totalPoints: e.reduce(LeaderboardSevice.totalPoint, 0),
  //     totalGames: result[i].length,
  //     totalVictories: e.reduce(LeaderboardSevice.totalVictories, 0),
  //     totalDraws: e.reduce(LeaderboardSevice.totalDraws, 0),
  //     totalLosses: e.reduce(LeaderboardSevice.totalLosses, 0),
  //     goalsFavor: e.reduce(LeaderboardSevice.goalsFavor, 0),
  //     goalsOwn: e.reduce(LeaderboardSevice.goalsOwn, 0),
  //     goalsBalance: (e
  //       .reduce(LeaderboardSevice.goalsFavor, 0) - e.reduce(LeaderboardSevice.goalsOwn, 0)),
  //     efficiency: 0,
  //   }));
  // }

  async leaderboardHome() {
    const teams = await new TeamService(Team).getAllTeams();
    const matches = await this._service.getProgressMatches(false) as IMatchesTeamsHome[];

    const result = teams.map((e) => matches.filter((m) => +e.id === +m.homeTeamId));
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

  static totalPoint(acc: number, cur: Matche) {
    if (cur.homeTeamGoals > cur.awayTeamGoals) return acc + 3;
    if (cur.homeTeamGoals === cur.awayTeamGoals) return acc + 1;
    return acc;
  }

  static totalVictories(acc: number, cur: Matche) {
    if (cur.homeTeamGoals > cur.awayTeamGoals) return acc + 1;
    return acc;
  }

  static totalDraws(acc: number, cur: Matche) {
    if (cur.homeTeamGoals === cur.awayTeamGoals) return acc + 1;
    return acc;
  }

  static totalLosses(acc: number, cur: Matche) {
    if (cur.homeTeamGoals < cur.awayTeamGoals) return acc + 1;
    return acc;
  }

  static goalsFavor(acc: number, cur: Matche) {
    return cur.homeTeamGoals + acc;
  }

  static goalsOwn(acc: number, cur: Matche) {
    return cur.awayTeamGoals + acc;
  }
}
