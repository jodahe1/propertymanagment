import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TUserModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: USER_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TUserModuleConfigurationOptions>().build();

export type UserModuleOptions = typeof OPTIONS_TYPE;
export type UserModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
