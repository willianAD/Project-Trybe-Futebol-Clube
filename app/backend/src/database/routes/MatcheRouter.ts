import { Request, Response, Router } from 'express';
import Matche from '../models/Matche';
import MatcheService from '../services/MatcheService';
import MatcheController from '../controllers/MatcheController';

const router = Router();
const service = new MatcheService(Matche);
const controller = new MatcheController(service);

router.get('/', (req: Request, res: Response) => controller.getAll(req, res));

export default router;
