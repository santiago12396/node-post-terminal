import { environments } from './config/environments';

process.loadEnvFile(environments[process.env.NODE_ENV] || environments.dev);

import './config/env.validation';

console.log(process.env.PORT);
