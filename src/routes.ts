import { Router } from 'express';
import { TransactionRoutes } from './routes/transaction.routes';
import { AuthRoutes } from './routes/auth.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/transactions', TransactionRoutes.routes);
    router.use('/api/auth', AuthRoutes.routes);

    return router;
  }
}
