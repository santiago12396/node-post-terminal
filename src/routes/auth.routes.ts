import { RequestHandler, Router } from 'express';
import { AuthController } from '@/controllers';
import { schemaValidation } from '@/middlewares';
import { signupSchema } from '@/schemas';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    router.post(
      '/signup',
      schemaValidation(signupSchema),
      AuthController.signup as unknown as RequestHandler
    );
    router.post('/login', AuthController.login as unknown as RequestHandler);

    return router;
  }
}
