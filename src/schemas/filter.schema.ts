import z from 'zod/v4';

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC',
}

const validSortFields = [
  'createdAt',
  'terminalId',
  'amount',
  'currency',
  'cardMasked',
  'transactionType',
  'status',
] as const;

export const filterSchema = z.object({
  query: z.object({
    limit: z.coerce
      .number('El campo (limit) debe ser un número')
      .int('El campo (limit) debe ser un número entero')
      .positive({
        message: 'El campo (limit) debe ser un número entero mayor a 0',
      })
      .optional(),
    page: z
      .string()
      .nonempty('El campo (page) no puede estar vacío')
      .transform(Number)
      .refine(
        val => Number.isInteger(val) && val >= 0,
        'El campo (page) debe ser un número entero sin negativos'
      )
      .optional(),
    query: z.string('El campo (query) debe ser una cadena de texto').optional(),
    sortBy: z
      .string()
      .refine(val => validSortFields.includes(val as (typeof validSortFields)[number]), {
        message: `El campo (sortBy) debe ser uno de: ${validSortFields.join(', ')}`,
      })
      .optional(),
    order: z
      .string('El campo (order) debe ser una cadena de texto')
      .refine(val => Object.values(Order).includes(val as Order), {
        message: `El campo (order) debe ser uno de: ${Object.values(Order).join(', ')}`,
      })
      .optional(),
  }),
});

export type FilterType = z.infer<typeof filterSchema>['query'];
