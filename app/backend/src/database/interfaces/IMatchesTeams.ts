import Matche from '../models/Matche';

export default interface IMatchesTeamsHome extends Matche {
  homeTeam: {
    id: number,
    teamName: string,
  }
}
