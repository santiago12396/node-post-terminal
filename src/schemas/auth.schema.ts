import z from 'zod/v4';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;

export const signupSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: issue =>
          issue.input === undefined
            ? 'El campo (name) es obligatorio'
            : 'El campo (name) debe ser una cadena de texto',
      })
      .nonempty('El campo (name) no puede estar vacío'),

    email: z
      .string({
        error: issue =>
          issue.input === undefined
            ? 'El campo (email) es obligatorio'
            : 'El campo (email) debe ser una cadena de texto',
      })
      .regex(emailPattern, 'El campo (email) debe tener un formato válido'),

    password: z
      .string({
        error: issue =>
          issue.input === undefined
            ? 'El campo (password) es obligatorio'
            : 'El campo (password) debe ser una cadena de texto',
      })
      .min(6, 'El campo (password) debe tener al menos 6 caracteres'),
  }),
});

export const loginSchema = z.object({
  body: signupSchema.shape.body.pick({ email: true, password: true }),
});

export type SignupType = z.infer<typeof signupSchema>['body'];
export type LoginType = z.infer<typeof loginSchema>['body'];
