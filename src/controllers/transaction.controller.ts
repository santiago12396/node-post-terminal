import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { PostgresConfig } from '@/database';
import { CreateTransactionType, FilterType, Order } from '@/schemas';
import { handleError } from '@/errors';
import { ITransaction, TransactionType, TransactionStatus } from '@/interfaces';
import { TransactionModel } from '@/models';
import { TransactionEntity } from '@/entities';

export class TransactionController {
  static create = async (req: Request<unknown, unknown, CreateTransactionType>, res: Response) => {
    const transactionRepository = PostgresConfig.getDataSource().getRepository(TransactionEntity);

    const mongoTransaction = new TransactionModel(req.body);
    const postgresTransaction = transactionRepository.create({
      ...req.body,
      transactionType: req.body.transactionType as TransactionType,
      status: req.body.status as TransactionStatus,
    });

    try {
      await Promise.all([mongoTransaction.save(), transactionRepository.save(postgresTransaction)]);

      res.status(201).json({
        message: 'Transacción creada con éxito',
        data: mongoTransaction,
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

      const result = await TransactionModel.paginate(mongoQuery, {
        limit: Number(limit),
        offset: Number(page),
        sort,
        lean: true,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      res.json(result.docs.map(({ _id, ...rest }) => rest));
    } catch (error) {
      handleError(error, res);
    }
  };
}
