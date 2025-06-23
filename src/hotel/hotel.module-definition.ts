import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface THotelModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: HOTEL_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<THotelModuleConfigurationOptions>().build();

export type HotelModuleOptions = typeof OPTIONS_TYPE;
export type HotelModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
