import { Request, Response } from 'express';
import TeamService from '../services/Team.Service';

export default class TeamController {
  private _service: TeamService;

  constructor(service: TeamService) {
    this._service = service;
  }

  async getAll(_req: Request, res: Response) {
    const teams = await this._service.getAllTeams();
    return res.status(200).json(teams);
  }
}
