import { Request, Response, Router } from 'express';

const router = Router();

router.get('/api', (_req: Request, res: Response) => {
  res.json('👋 Howdy from the server :)');
});

router.post('/api2', (_req: Request, res: Response) => {
  res.json('👋 Howdy from the server :) Nice post request');
});

export default router;
