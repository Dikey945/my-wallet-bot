import { Markup } from 'telegraf';
import { ExpensesCategoriesEnum } from './enums/expenses-categories.enum';

export const actionButtons = () => {
  return Markup.keyboard(
    [Markup.button.text('Транзакції'), Markup.button.text('Статистика')],
    { columns: 2 },
  );
};

export const expensesButtons = () => {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('Затранжирив 😿', 'expenses'),
      Markup.button.callback('Заробив 💸', 'income'),
      Markup.button.callback('Нє, всьо покашо', 'cancel'),
    ],
    { columns: 3 },
  );
};

export const categoriesButtons = () => {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('Їжа 🍔', ExpensesCategoriesEnum.FOOD),
      Markup.button.callback('Транспорт 🚕', ExpensesCategoriesEnum.TRANSPORT),
      Markup.button.callback(
        'Розваги 🎉',
        ExpensesCategoriesEnum.ENTERTAINMENT,
      ),
      Markup.button.callback('Дім 🏠', ExpensesCategoriesEnum.HOME),
      Markup.button.callback('Одяг 👕', ExpensesCategoriesEnum.CLOTHES),
      Markup.button.callback('Діти 👶', ExpensesCategoriesEnum.CHILDREN),
      Markup.button.callback("Здоров'я 🏥", ExpensesCategoriesEnum.HEALTH),
      Markup.button.callback('Машина 🚗', ExpensesCategoriesEnum.CAR),
      Markup.button.callback('Інше 🤷‍♂️', ExpensesCategoriesEnum.OTHER),
    ],
    { columns: 3 },
  );
};
