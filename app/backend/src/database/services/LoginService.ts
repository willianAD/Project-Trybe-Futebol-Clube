import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../models/User';
import { newToken } from '../utils/token';

export default class LoginService {
  private _model: ModelStatic<User>;

  constructor(model: ModelStatic<User>) {
    this._model = model;
  }

  async login(email: string, password: string): Promise<string | boolean> {
    const userId = await this._model.findOne({ where: { email } });

    if (!userId) {
      return false;
    }

    const decryptPassword = bcrypt.compareSync(password, userId.dataValues.password);

    if (!decryptPassword) {
      return 'Invalid password';
    }

    const { _password, ...payload } = userId.dataValues;
    console.log(payload);
    return newToken(payload);
  }
}
