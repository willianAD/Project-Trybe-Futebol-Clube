import { Request, Response } from 'express';
import LeaderboardHomeSevice from '../services/LeaderboardHomeService';

export default class LeaderboardController {
  private _service: LeaderboardHomeSevice;

  constructor(service: LeaderboardHomeSevice) {
    this._service = service;
  }

  // async getAll(_req: Request, res: Response) {
  //   const leaderboard = await this._service.leaderboardHome();
  //   return res.status(200).json(leaderboard);
  // }

  async getAllHome(_req: Request, res: Response) {
    const leaderboard = await this._service.leaderboardFilter();
    return res.status(200).json(leaderboard);
  }
}
