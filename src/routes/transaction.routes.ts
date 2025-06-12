import { Router } from 'express';
import { TransactionController } from '@/controllers';

// TODO: BearerAuth
export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/', TransactionController.findAll);
    router.post('/', TransactionController.create);

    return router;
  }
}
