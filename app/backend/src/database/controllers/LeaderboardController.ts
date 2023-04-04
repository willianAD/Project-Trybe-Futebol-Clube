import { Request, Response } from 'express';
import LeaderboardHomeSevice from '../services/LeaderboardHomeService';
import LeaderboardAwayService from '../services/LeaderboardAwaySevice';

export default class LeaderboardController {
  private _serviceHome: LeaderboardHomeSevice;
  private _serviceAway: LeaderboardAwayService;

  constructor(serviceHome: LeaderboardHomeSevice, serviceAway: LeaderboardAwayService) {
    this._serviceHome = serviceHome;
    this._serviceAway = serviceAway;
  }

  // async getAll(_req: Request, res: Response) {
  //   const leaderboard = await this._service.leaderboardHome();
  //   return res.status(200).json(leaderboard);
  // }

  async getAllHome(_req: Request, res: Response) {
    const leaderboard = await this._serviceHome.leaderboardFilter();
    return res.status(200).json(leaderboard);
  }

  async getAllAway(_req: Request, res: Response) {
    const leaderboard = await this._serviceAway.leaderboardFilter();
    return res.status(200).json(leaderboard);
  }
}
