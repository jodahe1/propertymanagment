import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TServiceproductModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: SERVICEPRODUCT_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TServiceproductModuleConfigurationOptions>().build();

export type ServiceproductModuleOptions = typeof OPTIONS_TYPE;
export type ServiceproductModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
