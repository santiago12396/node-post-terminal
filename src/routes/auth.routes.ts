import { RequestHandler, Router } from 'express';
import { AuthController } from '@/controllers';
import { schemaValidation } from '@/middlewares';
import { loginSchema, signupSchema } from '@/schemas';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    /**
     * @swagger
     * /api/v1/auth/signup:
     *   post:
     *     tags: [Auth]
     *     summary: Registrar usuario
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SignupDTO'
     *     responses:
     *       201:
     *         description: Usuario creado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SignupResponse'
     *       400:
     *         description: Error de validación
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     *       500:
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InternalServerError'
     */
    router.post(
      '/signup',
      schemaValidation(signupSchema),
      AuthController.signup as unknown as RequestHandler
    );

    /**
     * @swagger
     * /api/v1/auth/login:
     *   post:
     *     tags: [Auth]
     *     summary: Iniciar sesión
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginDTO'
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/LoginResponse'
     *       400:
     *         description: Error de autenticación
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     *       500:
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InternalServerError'
     */
    router.post(
      '/login',
      schemaValidation(loginSchema),
      AuthController.login as unknown as RequestHandler
    );

    return router;
  }
}
