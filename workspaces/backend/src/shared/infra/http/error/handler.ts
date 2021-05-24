import { ErrorRequestHandler } from 'express';
import { format } from 'date-fns';
import AppError from './AppError';

const errorHandler: ErrorRequestHandler = (error, request, response, _) => {
  const now = format(Date.now(), 'dd/MM/yyyy hh:mm:ss');
  console.log({
    timestamp: now,
    url: `${request.method} ${request.headers.host}/${request.url}`,
    headers: request.headers,
    body: request.body,
    params: request.params,
    query: request.query,
    error
  });

  if (error instanceof AppError) return response.status(error.status).json(error);

  return response.status(500).json({
    status: 500,
    message: 'Internal server error'
  });
};

export default errorHandler;
