import { Document, model, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ITransaction, TransactionStatus, TransactionType } from '@/interfaces';

const transactionSchema = new Schema(
  {
    terminalId: {
      type: String,
      required: [true, 'El ID del terminal es requerido'],
    },
    amount: {
      type: Number,
      required: [true, 'El monto es requerido'],
      min: [0, 'El monto no puede ser negativo'],
    },
    currency: {
      type: String,
      required: [true, 'La moneda es requerida'],
      enum: ['COP'],
    },
    cardMasked: {
      type: String,
      required: [true, 'La tarjeta enmascarada es requerida'],
    },
    transactionType: {
      type: String,
      required: [true, 'El tipo de transacción es requerido'],
      enum: Object.values(TransactionType),
    },
    status: {
      type: String,
      required: [true, 'El estado de la transacción es requerido'],
      enum: Object.values(TransactionStatus),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

transactionSchema.plugin(mongoosePaginate);

interface TransactionDocument extends Document, ITransaction {}

export const TransactionModel = model<TransactionDocument, PaginateModel<TransactionDocument>>(
  'Transaction',
  transactionSchema
);
