import { Request, Response, Router } from 'express';
import LeaderboardSevice from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';
import MatcheService from '../services/MatcheService';
import Matche from '../models/Matche';

const router = Router();
const service = new LeaderboardSevice(new MatcheService(Matche));
const controller = new LeaderboardController(service);

router.get('/home', (req: Request, res: Response) => controller.getAll(req, res));

export default router;
