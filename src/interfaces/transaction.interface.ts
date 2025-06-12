export enum TransactionType {
  Sale = 'sale',
  Refund = 'refund',
  Void = 'void',
}

export enum TransactionStatus {
  Approved = 'approved',
  Pending = 'pending',
  Declined = 'declined',
  Cancelled = 'cancelled',
}

export interface ITransaction {
  terminalId: string;
  amount: number;
  currency: 'COP';
  cardMasked: string;
  transactionType: TransactionType;
  status: TransactionStatus;
}
