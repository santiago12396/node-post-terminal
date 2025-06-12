import z from 'zod/v4';
import { TransactionStatus, TransactionType } from '@/interfaces';

export const createTransactionSchema = z.object({
  body: z.object({
    terminalId: z
      .string({
        error: issue =>
          issue.input === undefined
            ? 'El campo (terminalId) es obligatorio'
            : 'El campo (terminalId) debe ser una cadena de texto',
      })
      .nonempty('El campo (terminalId) no puede estar vacío'),

    amount: z
      .number({
        error: issue =>
          issue.input === undefined
            ? 'El campo (amount) es obligatorio'
            : 'El campo (amount) debe ser un número',
      })
      .positive('El campo (amount) debe ser un número > 0'),

    currency: z
      .string({
        error: issue =>
          issue.input === undefined
            ? 'El campo (currency) es obligatorio'
            : 'El campo (currency) debe ser una cadena de texto',
      })
      .refine(val => ['COP'].includes(val), {
        message: 'El campo (currency) debe ser uno de: COP',
      }),

    cardMasked: z
      .string({
        error: issue =>
          issue.input === undefined
            ? 'El campo (cardMasked) es obligatorio'
            : 'El campo (cardMasked) debe ser una cadena de texto',
      })
      .regex(/^\d+$/, 'El campo (cardMasked) debe contener solo números'),

    transactionType: z
      .string({
        error: issue =>
          issue.input === undefined
            ? 'El campo (transactionType) es obligatorio'
            : 'El campo (transactionType) debe ser una cadena de texto',
      })
      .refine(val => Object.values(TransactionType).includes(val as TransactionType), {
        message: `El campo (transactionType) debe ser uno de: ${Object.values(TransactionType).join(', ')}`,
      }),

    status: z
      .string({
        error: issue =>
          issue.input === undefined
            ? 'El campo (status) es obligatorio'
            : 'El campo (status) debe ser una cadena de texto',
      })
      .refine(val => Object.values(TransactionStatus).includes(val as TransactionStatus), {
        message: `El campo (status) debe ser uno de: ${Object.values(TransactionStatus).join(', ')}`,
      }),
  }),
});

export type CreateTransactionType = z.infer<typeof createTransactionSchema>['body'];
