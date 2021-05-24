import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const getMongoConnection = (): MongoConnectionOptions => {
  switch (env.NODE_ENV) {
    case 'LOCAL':
      return {
        type: 'mongodb',
        url: `mongodb://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}/${env.MONGODB_NAME}`,
        synchronize: false,
        logging: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        entities: ['src/modules/**/entity/*.ts']
      };
    case 'PRODUCTION':
      return {
        type: 'mongodb',
        url: `mongodb+srv://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}/${env.MONGODB_NAME}?retryWrites=true&w=majority`,
        synchronize: false,
        logging: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        entities: ['src/modules/**/entity/*.ts']
      };
    case 'TEST':
      return {
        type: 'mongodb',
        url: `mongodb://docker:docker@localhost/school`,
        synchronize: false,
        logging: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        entities: ['src/modules/**/entity/*.ts']
      };
    default:
      return null;
  }
};

const config: MongoConnectionOptions = getMongoConnection();

export default config;
