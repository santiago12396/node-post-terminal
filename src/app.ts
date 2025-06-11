import { environments } from './config/environments';
import { Server } from './server';
import { AppRoutes } from './routes';

process.loadEnvFile(environments[process.env.NODE_ENV] || environments.dev);

import './config/env.validation';

(async () => {
  try {
    const { PORT } = process.env;

    new Server({
      port: Number(PORT),
      routes: AppRoutes.routes,
    }).init();
  } catch (error) {
    console.error('Error al iniciar la app:', error);
    process.exit(1);
  }
})();
