import { Context as BaseContext } from 'telegraf';

export interface BotTransaction {
  description?: string;
  amount?: number;
  category?: string;
}
export interface Context extends BaseContext {
  session: {
    stage: string | null;
    transaction: BotTransaction;
  };
}

export interface TgUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}
