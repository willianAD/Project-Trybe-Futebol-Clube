import { Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

export default class MatcheController {
  private _service: MatcheService;

  constructor(service: MatcheService) {
    this._service = service;
  }

  async getAll(_req: Request, res: Response) {
    const matches = await this._service.getAllMatches();
    return res.status(200).json(matches);
  }

  // async getBySearch(req: Request, res: Response) {
  //   const q = req.query;
  //   const matches = await this._service.getProgressMatches(q);
  //   return res.status(200).json(matches);
  // }

  // async getId(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const teamsId = await this._service.getById(id);

  //   if (!teamsId) {
  //     return res.status(404).json({ message: 'Id not found' });
  //   }

  //   return res.status(200).json(teamsId);
  // }
}
