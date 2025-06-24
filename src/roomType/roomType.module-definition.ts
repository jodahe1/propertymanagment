import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TRoomTypeModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: ROOMTYPE_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TRoomTypeModuleConfigurationOptions>().build();

export type RoomTypeModuleOptions = typeof OPTIONS_TYPE;
export type RoomTypeModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
