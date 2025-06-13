import { z } from 'zod/v4';

const envVars = z.object({
  NODE_ENV: z.enum(['dev', 'prod']),
  PORT: z.coerce.number().int().positive({
    message: 'PORT debe ser un número entero mayor a 0',
  }),
  DATASOURCE_DB: z.string().nonempty(),
  DATASOURCE_USER: z.string().nonempty(),
  DATASOURCE_PASSWORD: z.string().nonempty(),
  JWT_SEED: z.string().nonempty(),
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
