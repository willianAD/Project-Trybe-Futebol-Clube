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
    const message = 'Invalid email or password';

    if (!userId) {
      return message;
    }

    const decryptPassword = bcrypt.compareSync(password, userId.password);

    if (!decryptPassword) {
      return message;
    }

    const { id, role, username } = userId;
    return newToken({ id, role, email, username });
  }
}
