import { Request, Response, Router } from 'express';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/api/transactions', (req: Request, res: Response) => {
      res.json({ message: 'Testing...' });
    });

    return router;
  }
}
