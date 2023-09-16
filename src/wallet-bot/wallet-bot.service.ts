import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Between, Repository } from 'typeorm';
import { Expenses } from '../entities/expenses.entity';
import { Income } from '../entities/income.entity';
import { BotTransaction, TgUser } from '../utils/types';

@Injectable()
export class WalletBotService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Expenses)
    private expensesRepository: Repository<Expenses>,
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
  ) {}

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
      findUser = await this.userRepository.save(newUser);
    }
    const newExpenses = {
      ...expenses,
      user: findUser,
    };

    return this.expensesRepository.save(newExpenses);
  }

  async createIncomeTransaction(
    income: BotTransaction,
    user: TgUser,
  ): Promise<Income> {
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
      findUser = await this.userRepository.save(newUser);
    }
    const newIncome = {
      ...income,
      user: findUser,
    };

    return this.incomeRepository.save(newIncome);
  }

  getExpensesByLastMonth(user: TgUser): Promise<Expenses[]> {
    const userId = user.id;
    const startDate = new Date();
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    const queryCriteria = {
      where: {
        user: {
          userTgId: userId,
        },
        createdAt: Between(startDate, endDate),
      },
      // You can include other options here if needed
    };
    return this.expensesRepository.find(queryCriteria);
  }
}
