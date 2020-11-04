import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomesArray = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const outcomesArray = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const income = incomesArray.reduce(
      (accumulator: number, transaction: Transaction) =>
        transaction.value + accumulator,
      0,
    );
    const outcome = outcomesArray.reduce(
      (accumulator: number, transaction: Transaction) =>
        transaction.value + accumulator,
      0,
    );
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
