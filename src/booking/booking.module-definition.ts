import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TBookingModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: BOOKING_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TBookingModuleConfigurationOptions>().build();

export type BookingModuleOptions = typeof OPTIONS_TYPE;
export type BookingModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
