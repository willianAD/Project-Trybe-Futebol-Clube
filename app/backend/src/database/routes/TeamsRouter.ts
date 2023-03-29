import { Request, Response, Router } from 'express';
import Team from '../models/Team';
import TeamService from '../services/Team.Service';
import TeamController from '../controllers/TeamController';

const router = Router();
const service = new TeamService(Team);
const controller = new TeamController(service);

router.get('/', (req: Request, res: Response) => controller.getAll(req, res));

export default router;
