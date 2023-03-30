import { Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

export default class MatcheController {
  private _service: MatcheService;

  constructor(service: MatcheService) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    const valid = ['true', 'false'];

    if (!valid.includes(inProgress as string)) {
      const matches = await this._service.getAllMatches();
      return res.status(200).json(matches);
    }

    const convertBoll = inProgress === 'true';

    const matches = await this._service.getProgressMatches(convertBoll);

    return res.status(200).json(matches);
  }

  async getId(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.getById(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  async patchId(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.patchById(homeTeamGoals, awayTeamGoals, Number(id));

    return res.status(200).json({ message: 'Finished' });
  }
}
