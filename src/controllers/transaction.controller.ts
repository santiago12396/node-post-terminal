import { Request, RequestHandler, Response } from 'express';

export class TransactionController {
  static findAll: RequestHandler = (req: Request, res: Response) => {
    res.json({ message: 'Hello Wordl!' });
  };
}
