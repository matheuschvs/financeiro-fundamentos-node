import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
      (accumulator, transaction) => transaction.value + accumulator,
      0,
    );
    const outcome = outcomesArray.reduce(
      (accumulator, transaction) => transaction.value + accumulator,
      0,
    );
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
