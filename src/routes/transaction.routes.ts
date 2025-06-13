import { RequestHandler, Router } from 'express';
import { TransactionController } from '@/controllers';
import { schemaValidation } from '@/middlewares';
import { createTransactionSchema, filterSchema } from '@/schemas';
import { validateToken } from '@/middlewares/auth.middleware';
export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();

    router.get(
      '/',
      [validateToken, schemaValidation(filterSchema)],
      TransactionController.findAll as unknown as RequestHandler
    );
    router.post(
      '/',
      [validateToken, schemaValidation(createTransactionSchema)],
      TransactionController.create as unknown as RequestHandler
    );

    return router;
  }
}
