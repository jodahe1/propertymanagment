import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TGuestModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: GUEST_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TGuestModuleConfigurationOptions>().build();

export type GuestModuleOptions = typeof OPTIONS_TYPE;
export type GuestModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
