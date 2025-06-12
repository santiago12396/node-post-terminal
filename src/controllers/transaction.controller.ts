import { Request, RequestHandler, Response } from 'express';
import { Transaction } from '@/models';

export class TransactionController {
  static create: RequestHandler = async (req: Request, res: Response) => {
    try {
      const transaction = new Transaction(req.body);
      await transaction.save();
      res.status(201).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static findAll: RequestHandler = (req: Request, res: Response) => {
    res.json({ message: 'Hello Wordl!' });
  };
}
