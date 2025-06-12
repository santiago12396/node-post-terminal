import { Router } from 'express';
import { TransactionController } from '@/controllers';
import { schemaValidation } from '@/middlewares';
import { createTransactionSchema } from '@/schemas';

// TODO: BearerAuth
export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/', TransactionController.findAll);
    router.post('/', schemaValidation(createTransactionSchema), TransactionController.create);

    return router;
  }
}
