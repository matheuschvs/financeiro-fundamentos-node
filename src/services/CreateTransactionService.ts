import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface InsertTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  total: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    value,
    type,
    total,
  }: InsertTransactionDTO): Transaction {
    if (type === 'outcome' && total < value) {
      throw Error('Not enough cash');
    }

    const newTransaction = new Transaction({ title, value, type });

    this.transactionsRepository.create(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
