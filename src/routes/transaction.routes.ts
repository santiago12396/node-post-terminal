import { Router } from 'express';
import { TransactionController } from '@/controllers';

export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/', TransactionController.findAll);

    return router;
  }
}
