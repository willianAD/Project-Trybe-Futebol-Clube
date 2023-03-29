import { ModelStatic } from 'sequelize';
import Team from '../models/Team';

export default class TeamService {
  private _model: ModelStatic<Team>;

  constructor(model: ModelStatic<Team>) {
    this._model = model;
  }

  async getAllTeams(): Promise<Team[]> {
    const all = await this._model.findAll();
    return all;
  }

  async getById(id: string): Promise<Team | null> {
    const result = await this._model.findByPk(id);
    return result;
  }
}
