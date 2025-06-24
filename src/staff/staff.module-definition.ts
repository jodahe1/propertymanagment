import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TStaffModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: STAFF_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TStaffModuleConfigurationOptions>().build();

export type StaffModuleOptions = typeof OPTIONS_TYPE;
export type StaffModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
