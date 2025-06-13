import { environments } from './config/environments';
import { Server } from './server';
import { AppRoutes } from './routes';
import { MongoConfig, PostgresConfig } from './database';

process.loadEnvFile(environments[process.env.NODE_ENV] || environments.dev);

import './config/env.validation';
import 'reflect-metadata';

(async () => {
  try {
    const { PORT, DATASOURCE_DB, DATASOURCE_USER, DATASOURCE_PASSWORD, MONGO_URI } = process.env;

    await Promise.all([
      MongoConfig.connect({ mongoURI: MONGO_URI, dbName: DATASOURCE_DB }),
      PostgresConfig.connect({
        database: DATASOURCE_DB,
        username: DATASOURCE_USER,
        password: DATASOURCE_PASSWORD,
      }),
    ]);

    new Server({
      port: Number(PORT),
      routes: AppRoutes.routes,
    }).init();
  } catch (error) {
    console.error('Error al iniciar la app:', error);
    process.exit(1);
  }
})();
