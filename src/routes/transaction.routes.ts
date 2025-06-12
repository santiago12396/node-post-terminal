import { RequestHandler, Router } from 'express';
import { TransactionController } from '@/controllers';
import { schemaValidation } from '@/middlewares';
import { createTransactionSchema, filterSchema } from '@/schemas';

// TODO: BearerAuth
export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();

    router.get(
      '/',
      schemaValidation(filterSchema),
      TransactionController.findAll as unknown as RequestHandler
    );
    router.post(
      '/',
      schemaValidation(createTransactionSchema),
      TransactionController.create as unknown as RequestHandler
    );

    return router;
  }
}
