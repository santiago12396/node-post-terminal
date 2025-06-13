import { DataSource } from 'typeorm';
import { TransactionEntity, UserEntity } from '@/entities';

interface PostgresOptions {
  username: string;
  password: string;
  database: string;
}

export class PostgresConfig {
  private static dataSource: DataSource;

  static get AppDataSource(): DataSource {
    if (!this.dataSource) {
      throw new Error('PostgreSQL connection not initialized');
    }
    return this.dataSource;
  }

  static async connect(options: PostgresOptions) {
    try {
      this.dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: options.username,
        password: options.password,
        database: options.database,
        synchronize: true,
        entities: [TransactionEntity, UserEntity],
      });

      await this.dataSource.initialize();
      console.log('Postgres connected');
    } catch (error) {
      console.error('Postgres connection error');
      throw error;
    }
  }

  static getDataSource(): DataSource {
    if (!this.dataSource) {
      throw new Error('Postgres connection not initialized');
    }
    return this.dataSource;
  }
}
