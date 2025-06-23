import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TPaymentModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: PAYMENT_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TPaymentModuleConfigurationOptions>().build();

export type PaymentModuleOptions = typeof OPTIONS_TYPE;
export type PaymentModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
