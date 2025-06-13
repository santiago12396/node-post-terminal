import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { CreateTransactionType, FilterType, Order } from '@/schemas';
import { Transaction } from '@/models';
import { ITransaction } from '@/interfaces';
import { handleError } from '@/errors';

export class TransactionController {
  static create = async (req: Request<unknown, unknown, CreateTransactionType>, res: Response) => {
    try {
      const transaction = new Transaction(req.body);
      await transaction.save();
      res.status(201).json({
        message: 'Transacción creada con éxito',
        data: transaction,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  static findAll = async (req: Request<unknown, unknown, unknown, FilterType>, res: Response) => {
    try {
      const {
        limit = 10,
        page = 0,
        query = '',
        sortBy = 'CreatedAt',
        order = Order.Desc,
      } = req.query;

      const regex = new RegExp(query, 'i');

      const mongoQuery: FilterQuery<ITransaction> = {};

      if (query.trim()) {
        mongoQuery.$or = [
          { terminalId: regex },
          { cardMasked: regex },
          { transactionType: regex },
          { status: regex },
        ];
      }

      const sort = { [sortBy]: order === Order.Desc ? -1 : 1 };

      const result = await Transaction.paginate(mongoQuery, {
        limit: Number(limit),
        offset: Number(page),
        sort,
        lean: true,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      res.json(result.docs.map(({ id, ...rest }) => rest));
    } catch (error) {
      handleError(error, res);
    }
  };
}
