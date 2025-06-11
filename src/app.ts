import { environments } from './config/environments';
import { Server } from './server';
import { AppRoutes } from './routes';
import { MongoConfig } from './database';

process.loadEnvFile(environments[process.env.NODE_ENV] || environments.dev);

import './config/env.validation';

(async () => {
  try {
    const { MONGO_URI, MONGO_DB, PORT } = process.env;

    await MongoConfig.connect({ mongoURI: MONGO_URI, dbName: MONGO_DB });

    new Server({
      port: Number(PORT),
      routes: AppRoutes.routes,
    }).init();
  } catch (error) {
    console.error('Error al iniciar la app:', error);
    process.exit(1);
  }
})();
