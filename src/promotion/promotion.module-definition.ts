import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TPromotionModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: PROMOTION_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TPromotionModuleConfigurationOptions>().build();

export type PromotionModuleOptions = typeof OPTIONS_TYPE;
export type PromotionModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
