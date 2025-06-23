import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TRateplanModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: RATEPLAN_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TRateplanModuleConfigurationOptions>().build();

export type RateplanModuleOptions = typeof OPTIONS_TYPE;
export type RateplanModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
