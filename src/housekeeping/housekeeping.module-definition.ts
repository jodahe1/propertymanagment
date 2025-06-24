import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface THousekeepingModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: HOUSEKEEPING_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<THousekeepingModuleConfigurationOptions>().build();

export type HousekeepingModuleOptions = typeof OPTIONS_TYPE;
export type HousekeepingModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
