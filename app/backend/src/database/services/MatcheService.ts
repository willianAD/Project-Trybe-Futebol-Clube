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

  // async getProgressMatches(q: string): Promise<Matche[]> {
  //   const progress = await this._model.findAll({
  //     where: { },
  //     include: [{ model: Team, as: 'awayTeam' }, { model: Team, as: 'homeTeam' }],
  //   });
  //   return progress;
  // }

  // async getById(id: string): Promise<Matche | null> {
  //   const result = await this._model.findByPk(id);
  //   return result;
  // }
}
