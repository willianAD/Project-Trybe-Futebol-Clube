import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
// import { validateToken } from '../utils/token';

export default class LoginController {
  private _service: LoginService;

  constructor(service: LoginService) {
    this._service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const token = await this._service.login(email, password);

    return res.status(200).json({ token });
  }
}
