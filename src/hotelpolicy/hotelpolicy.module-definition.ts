import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface THotelpolicyModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: HOTELPOLICY_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<THotelpolicyModuleConfigurationOptions>().build();

export type HotelpolicyModuleOptions = typeof OPTIONS_TYPE;
export type HotelpolicyModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
