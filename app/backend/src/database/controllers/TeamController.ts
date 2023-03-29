import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private _service: TeamService;

  constructor(service: TeamService) {
    this._service = service;
  }

  async getAll(_req: Request, res: Response) {
    const teams = await this._service.getAllTeams();
    return res.status(200).json(teams);
  }

  async getId(req: Request, res: Response) {
    const { id } = req.params;
    const teamsId = await this._service.getById(id);

    if (!teamsId) {
      return res.status(404).json({ message: 'Id not found' });
    }

    return res.status(200).json(teamsId);
  }
}
