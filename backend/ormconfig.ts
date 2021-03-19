import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

const config: MongoConnectionOptions = {
  type: 'mongodb',
  url: `mongodb${process.env.ENV === 'production' ? '+srv' : ''}://${process.env.MONGODB_USER}:${
    process.env.MONGODB_PASSWORD
  }@${process.env.MONGODB_HOST}/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
  database: 'school',
  port: 27017,
  synchronize: false,
  logging: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  entities: ['src/modules/**/entity/*.ts']
};

export default config;
