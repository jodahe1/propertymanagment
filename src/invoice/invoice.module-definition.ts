import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TInvoiceModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: INVOICE_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TInvoiceModuleConfigurationOptions>().build();

export type InvoiceModuleOptions = typeof OPTIONS_TYPE;
export type InvoiceModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
