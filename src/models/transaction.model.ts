import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
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
      enum: ['SALE', 'REFUND', 'VOID'],
    },
    status: {
      type: String,
      required: [true, 'El estado de la transacción es requerido'],
      enum: ['APPROVED', 'PENDING', 'DECLINED', 'CANCELLED'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
