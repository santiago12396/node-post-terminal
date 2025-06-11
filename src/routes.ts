import { Router } from 'express';
import { TransactionRoutes } from './routes/transaction.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/transactions', TransactionRoutes.routes);

    return router;
  }
}
