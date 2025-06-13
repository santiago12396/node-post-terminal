import { Response } from 'express';
import { CustomError } from './custom-error';

export const handleError = (error: unknown, res: Response) => {
  console.error(error);

  if (error instanceof CustomError)
    return res.status(error.statusCode).json({ error: error.message });

  return res.status(500).json({ error: 'Internal Server Error' });
};
