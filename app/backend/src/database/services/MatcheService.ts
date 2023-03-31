import { ModelStatic } from 'sequelize';
import Matche from '../models/Matche';
import Team from '../models/Team';

export default class MatcheService {
  private _model: ModelStatic<Matche>;

  constructor(model: ModelStatic<Matche>) {
    this._model = model;
  }

  async getAllMatches(): Promise<Matche[]> {
    const all = await this._model.findAll(
      {
        include:
        [
          { model: Team, as: 'awayTeam' },
          { model: Team, as: 'homeTeam' },
        ],
      },
    );
    return all;
  }

  async getProgressMatches(inProgress: boolean): Promise<Matche[]> {
    const progress = await this._model.findAll({
      where: { inProgress },
      include: [{ model: Team, as: 'awayTeam' }, { model: Team, as: 'homeTeam' }],
    });
    return progress;
  }

  async getById(id: number) {
    await this._model.update({ inProgress: false }, { where: { id } });
  }

  async patchById(homeTeamGoals: number, awayTeamGoals: number, id: number) {
    await this._model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async postById(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const result = await this._model.create(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
    return result;
  }
}
