import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TExpenseModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: EXPENSE_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TExpenseModuleConfigurationOptions>().build();

export type ExpenseModuleOptions = typeof OPTIONS_TYPE;
export type ExpenseModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
