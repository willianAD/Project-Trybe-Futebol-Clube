import { Request, Response } from 'express';
import LeaderboardSevice from '../services/LeaderboardService';

export default class LeaderboardController {
  private _service: LeaderboardSevice;

  constructor(service: LeaderboardSevice) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    const leaderboard = await this._service.leaderboardHome();
    // console.log(leaderboard);
    return res.status(200).json(leaderboard);
  }
}
