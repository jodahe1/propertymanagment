import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TRoomtypeModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: ROOMTYPE_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TRoomtypeModuleConfigurationOptions>().build();

export type RoomtypeModuleOptions = typeof OPTIONS_TYPE;
export type RoomtypeModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
