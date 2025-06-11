import { z } from 'zod/v4';

const envVars = z.object({
  PORT: z.string().refine(val => Number.isInteger(Number(val)) && Number(val) > 0, {
    message: 'PORT debe ser un número válido mayor a 0',
  }),
  NODE_ENV: z.enum(['dev', 'prod']),
  MONGO_USER: z.string().nonempty(),
  MONGO_PASSWORD: z.string().nonempty(),
  MONGO_DB: z.string().nonempty(),
  MONGO_URI: z.url({ protocol: /^mongodb$/ }),
});

envVars.parse(process.env);

declare global {
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace NodeJS {
    /* eslint-disable @typescript-eslint/no-empty-object-type */
    interface ProcessEnv extends z.infer<typeof envVars> {}
  }
}
