import { Server } from '@/server';
import { MongoConfig } from '@/database/mongo.config';
import { PostgresConfig } from '@/database/postgres.config';

jest.mock('@/database/mongo.config', () => ({
  MongoConfig: {
    connect: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock('@/database/postgres.config', () => ({
  PostgresConfig: {
    connect: jest.fn().mockResolvedValue(undefined),
  },
}));

const mockRoutes = {};
jest.mock('@/routes', () => ({
  AppRoutes: {
    routes: mockRoutes,
  },
}));

const mockServerInstance = {
  init: jest.fn(),
};
jest.mock('@/server', () => ({
  Server: jest.fn().mockImplementation(() => mockServerInstance),
}));

describe('Testing App.ts', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();

    process.env = {
      ...originalEnv,
      NODE_ENV: 'dev',
      PORT: 3000,
      DATASOURCE_DB: 'pos_terminal_dev',
      DATASOURCE_USER: 'santiago',
      DATASOURCE_PASSWORD: '123456',
      JWT_SEED: 'test_seed',
      MONGO_URI: 'mongodb://localhost:27017/test',
    } as NodeJS.ProcessEnv;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('should initialize server with correct options', async () => {
    await import('@/app');

    await new Promise(resolve => setImmediate(resolve));

    expect(MongoConfig.connect).toHaveBeenCalledWith({
      mongoURI: process.env.MONGO_URI,
      dbName: process.env.DATASOURCE_DB,
    });

    expect(PostgresConfig.connect).toHaveBeenCalledWith({
      database: process.env.DATASOURCE_DB,
      username: process.env.DATASOURCE_USER,
      password: process.env.DATASOURCE_PASSWORD,
    });

    expect(Server).toHaveBeenCalledWith({
      port: Number(process.env.PORT),
      routes: mockRoutes,
    });

    expect(mockServerInstance.init).toHaveBeenCalled();
  });
});
