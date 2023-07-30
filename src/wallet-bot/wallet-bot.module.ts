import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Expenses } from '../entities/expenses.entity';
import { Income } from '../entities/income.entity';
import { WalletBotService } from './wallet-bot.service';
import { WalletBotUpdate } from './wallet-bot.update';

@Module({
  imports: [TypeOrmModule.forFeature([User, Expenses, Income])],
  providers: [WalletBotService, WalletBotUpdate],
})
export class WalletBotModule {}
