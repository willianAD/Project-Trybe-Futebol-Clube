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

  async postId(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    try {
      const findId = await this._service.getId(homeTeamId, awayTeamId);
      if (!findId || findId.length > 1) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      const result = await this._service.postById(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
  }
}
