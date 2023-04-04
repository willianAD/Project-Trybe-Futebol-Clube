import { Request, Response } from 'express';
import LeaderboardHomeSevice from '../services/LeaderboardHomeService';
import LeaderboardAwayService from '../services/LeaderboardAwaySevice';
import LeaderboardSevice from '../services/LeaderboardSevice';

export default class LeaderboardController {
  private _serviceHome: LeaderboardHomeSevice;
  private _serviceAway: LeaderboardAwayService;
  private _service: LeaderboardSevice;

  constructor(
    serviceHome: LeaderboardHomeSevice,
    serviceAway: LeaderboardAwayService,
    service: LeaderboardSevice,
  ) {
    this._serviceHome = serviceHome;
    this._serviceAway = serviceAway;
    this._service = service;
  }

  async getAll(_req: Request, res: Response) {
    const leaderboard = await this._service.leaderboardOrder();
    return res.status(200).json(leaderboard);
  }

  async getAllHome(_req: Request, res: Response) {
    const leaderboard = await this._serviceHome.leaderboardFilter();
    return res.status(200).json(leaderboard);
  }

  async getAllAway(_req: Request, res: Response) {
    const leaderboard = await this._serviceAway.leaderboardFilter();
    return res.status(200).json(leaderboard);
  }
}
