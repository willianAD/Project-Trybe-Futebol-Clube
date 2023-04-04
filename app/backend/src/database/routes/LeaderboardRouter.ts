import { Request, Response, Router } from 'express';
import LeaderboardHomeSevice from '../services/LeaderboardHomeService';
import LeaderboardAwayService from '../services/LeaderboardAwaySevice';
import LeaderboardSevice from '../services/LeaderboardSevice';
import LeaderboardController from '../controllers/LeaderboardController';
import MatcheService from '../services/MatcheService';
import Matche from '../models/Matche';

const router = Router();
const service1 = new LeaderboardHomeSevice(new MatcheService(Matche));
const service2 = new LeaderboardAwayService(new MatcheService(Matche));
const service3 = new LeaderboardSevice(service1, service2);

const controller = new LeaderboardController(service1, service2, service3);

router.get('/home', (req: Request, res: Response) => controller.getAllHome(req, res));

router.get('/away', (req: Request, res: Response) => controller.getAllAway(req, res));

router.get('/', (req: Request, res: Response) => controller.getAll(req, res));

export default router;
