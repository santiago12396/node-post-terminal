import { RequestHandler, Router } from 'express';
import { TransactionController } from '@/controllers';
import { schemaValidation } from '@/middlewares';
import { createTransactionSchema, filterSchema } from '@/schemas';
import { validateToken } from '@/middlewares/auth.middleware';
export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();

    /**
     * @openapi
     * /api/v1/transactions:
     *   get:
     *     tags: [Transactions]
     *     security:
     *       - bearerAuth: []
     *     summary: Obtener transacciones
     *     parameters:
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 10
     *         description: Número de elementos por página
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           default: 0
     *         description: Número de página
     *       - in: query
     *         name: query
     *         schema:
     *           type: string
     *           default: ''
     *         description: Término de búsqueda para filtrar por terminalId, cardMasked, transactionType o status
     *       - in: query
     *         name: sortBy
     *         schema:
     *           type: string
     *           default: 'createdAt'
     *         description: Campo por el cual ordenar ('createdAt','terminalId','amount','currency','cardMasked','transactionType','status')
     *       - in: query
     *         name: order
     *         schema:
     *           type: string
     *           enum: [ASC, DESC]
     *           default: 'DESC'
     *         description: Orden de clasificación
     *     responses:
     *       '200':
     *         description: Lista de transacciones
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/TransactionsResponse"
     *       '401':
     *         description: Error de autenticación
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     *       '500':
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InternalServerError'
     */
    router.get(
      '/',
      [validateToken, schemaValidation(filterSchema)],
      TransactionController.findAll as unknown as RequestHandler
    );
    /**
     * @openapi
     * /api/v1/transactions:
     *   post:
     *     tags: [Transactions]
     *     security:
     *       - bearerAuth: []
     *     summary: Crear transacción
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/TransactionDTO"
     *     responses:
     *       '201':
     *         description: Transacción creada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/CreateTransactionResponse"
     *       '400':
     *         description: Error de validación
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     *       '401':
     *         description: Error de autenticación
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     *       '500':
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InternalServerError'
     */
    router.post(
      '/',
      [validateToken, schemaValidation(createTransactionSchema)],
      TransactionController.create as unknown as RequestHandler
    );

    return router;
  }
}
