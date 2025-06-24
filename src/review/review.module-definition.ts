import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TReviewModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: REVIEW_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TReviewModuleConfigurationOptions>().build();

export type ReviewModuleOptions = typeof OPTIONS_TYPE;
export type ReviewModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
