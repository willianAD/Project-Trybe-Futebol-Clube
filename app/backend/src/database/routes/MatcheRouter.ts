import { Request, Response, Router } from 'express';
import Matche from '../models/Matche';
import MatcheService from '../services/MatcheService';
import MatcheController from '../controllers/MatcheController';
import validateToken from '../middlewares/validateToken';
import validateMatche from '../middlewares/validateMatche';

const router = Router();
const service = new MatcheService(Matche);
const controller = new MatcheController(service);

router.get('/', (req: Request, res: Response) => controller.getAll(req, res));

router.patch('/:id/finish', validateToken, (req: Request, res: Response) => controller
  .getId(req, res));

router.patch('/:id', validateToken, (req: Request, res: Response) => controller.patchId(req, res));

router.post('/', validateToken, validateMatche, (req: Request, res: Response) => controller
  .postId(req, res));

export default router;
