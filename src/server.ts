import express, { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import specs from '@/swagger/swagger.config';

interface ServerOptions {
  port?: number;
  routes: Router;
}

export class Server {
  readonly app = express();

  private readonly port: number;
  private readonly routes: Router;

  constructor(serverOptions: ServerOptions) {
    const { port = 3000, routes } = serverOptions;
    this.port = port;
    this.routes = routes;
  }

  async init() {
    this.app.use(cors());

    this.app.use(morgan('dev'));

    this.app.use(express.json());

    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
