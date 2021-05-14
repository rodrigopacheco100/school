import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

const config: MongoConnectionOptions =
  process.env.ENV === 'local'
    ? {
        type: 'mongodb',
        username: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASSWORD,
        host: process.env.MONGODB_HOST,
        database: process.env.MONGODB_NAME,
        synchronize: false,
        logging: false,
        useUnifiedTopology: true,
        entities: ['src/modules/**/entity/*.ts']
      }
    : {
        type: 'mongodb',
        url: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
        synchronize: false,
        logging: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        entities: ['src/modules/**/entity/*.ts']
      };
export default config;
