import { AppService } from './app.service';
import { Action, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import {
  actionButtons,
  categoriesButtons,
  expensesButtons,
} from './app.buttons';
import { StateStageEnum } from './enums/state-stage.enum';
import { Context } from './utils/types';
import { ExpensesCategoriesEnum } from './enums/expenses-categories.enum';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,

    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    ctx.session.stage = null;
    ctx.session.transaction = {};
    await ctx.reply('Hello', actionButtons());
  }

  // Handler for text messages
  @On('text')
  async command(ctx: Context) {
    // console.log(ctx.message);
    if (
      'text' in ctx.message &&
      (ctx.message.text === 'Транзакції' || ctx.message.text === 'Статистика')
    ) {
      ctx.session.stage = null;
      ctx.session.transaction = {};
      const text: string = ctx.message.text;
      switch (text) {
        case 'Транзакції':
          await ctx.reply(
            'Сподіваюсь ти заробив, а не проїв як завжди',
            expensesButtons(),
          );
          break;
        case 'Статистика':
          await ctx.reply('You clicked on Заробив 💸');
          break;
        default:
          await ctx.reply('You sent some text');
          break;
      }
    } else if ('text' in ctx.message && ctx.session.stage) {
      switch (ctx.session.stage) {
        case StateStageEnum.EXPENSES_DESCRIPTION:
          ctx.session.transaction.description = ctx.message.text;
          ctx.session.stage = StateStageEnum.EXPENSES_AMOUNT;
          await ctx.reply('Скільки на цей раз?');
          break;
        case StateStageEnum.EXPENSES_AMOUNT:
          ctx.session.transaction.amount = Number(ctx.message.text);
          ctx.session.stage = StateStageEnum.EXPENSES_CATEGORY;
          await ctx.reply('І куди мені це все записати?', categoriesButtons());
      }
    }
  }

  // Handler for expenses flow button
  @Action('expenses')
  async expensesAction(ctx: Context) {
    console.log('ctx.state.stage before changing', ctx.state.stage);
    ctx.session.stage = StateStageEnum.EXPENSES_DESCRIPTION;
    ctx.session.transaction = {};
    console.log('ctx.state.stage after changing', ctx.state.stage);
    await ctx.reply('На що витратив, котик?');
  }

  // Handler for categories buttons
  @Action([
    ExpensesCategoriesEnum.FOOD,
    ExpensesCategoriesEnum.CLOTHES,
    ExpensesCategoriesEnum.TRANSPORT,
    ExpensesCategoriesEnum.ENTERTAINMENT,
    ExpensesCategoriesEnum.HOME,
    ExpensesCategoriesEnum.CHILDREN,
    ExpensesCategoriesEnum.HEALTH,
    ExpensesCategoriesEnum.CAR,
    ExpensesCategoriesEnum.OTHER,
  ])
  async categoriesAction(ctx: Context) {
    ctx.session.transaction.category = (ctx.callbackQuery as any).data;
    await this.appService.createExpensesTransaction(
      ctx.session.transaction,
      ctx.from,
    );
    ctx.session.transaction = {};
    ctx.session.stage = null;
    await ctx.reply('Я всьо записав, транжиро!');
  }
}
