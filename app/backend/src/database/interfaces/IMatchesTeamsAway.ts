import Matche from '../models/Matche';

export default interface IMatchesTeamsAway extends Matche {
  awayTeam: {
    id: number,
    teamName: string,
  }
}
