import { DataSource } from 'typeorm';
import { Transaction } from '@/entities';

interface PostgresOptions {
  username: string;
  password: string;
  database: string;
}

export class PostgresConfig {
  private static dataSource: DataSource;

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
        entities: [Transaction],
      });

      await this.dataSource.initialize();
      console.log('Postgres connected');
    } catch (error) {
      console.error('Postgres connection error');
      throw error;
    }
  }
}
