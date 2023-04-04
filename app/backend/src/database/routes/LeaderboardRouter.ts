import { Request, Response, Router } from 'express';
import LeaderboardHomeSevice from '../services/LeaderboardHomeService';
import LeaderboardController from '../controllers/LeaderboardController';
import MatcheService from '../services/MatcheService';
import Matche from '../models/Matche';

const router = Router();
const service = new LeaderboardHomeSevice(new MatcheService(Matche));
const controller = new LeaderboardController(service);

router.get('/home', (req: Request, res: Response) => controller.getAllHome(req, res));
// router.get('/home', (req: Request, res: Response) => controller.getAll(req, res));

export default router;
