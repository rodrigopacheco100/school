import { Connection, createConnection } from 'typeorm';

export default async (): Promise<Connection> => {
  try {
    const connection = await createConnection();
    console.log('Connected to database');
    return connection;
  } catch (err) {
    console.log('Connection to database has failed\n', err);
    return null;
  }
};
