import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Expenses } from './entities/expenses.entity';
import { Income } from './entities/income.entity';
import { BotTransaction, TgUser } from './utils/types';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Expenses)
    private expensesRepository: Repository<Expenses>,
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createExpensesTransaction(
    expenses: BotTransaction,
    user: TgUser,
  ): Promise<Expenses> {
    const userId = user.id;
    let findUser = await this.userRepository.findOne({
      where: {
        userTgId: userId,
      },
    });
    if (!findUser) {
      const newUser = {
        userTgId: userId,
        firstName: user.first_name,
        userTag: user.username,
      };
      const createdUser: User = await this.userRepository.save(newUser);
      findUser = createdUser;
    }
    const newExpenses = {
      ...expenses,
      user: findUser,
    };

    return this.expensesRepository.save(newExpenses);
  }
}
