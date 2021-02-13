import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, _, response) => {
  console.error(error);

  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
