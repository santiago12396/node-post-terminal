import mongoose from 'mongoose';

interface ConnectionOptions {
  mongoURI: string;
  dbName: string;
}

export class MongoConfig {
  static async connect(options: ConnectionOptions) {
    const { mongoURI, dbName } = options;

    try {
      await mongoose.connect(mongoURI, {
        dbName,
      });

      console.log('Mongo connected');
    } catch (error) {
      console.error('Mongo connection error');
      throw error;
    }
  }
}
