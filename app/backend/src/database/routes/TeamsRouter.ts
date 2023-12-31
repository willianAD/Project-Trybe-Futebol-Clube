import { Request, Response, Router } from 'express';
import Team from '../models/Team';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const router = Router();
const service = new TeamService(Team);
const controller = new TeamController(service);

router.get('/:id', (req: Request, res: Response) => controller.getId(req, res));

router.get('/', (req: Request, res: Response) => controller.getAll(req, res));

export default router;
