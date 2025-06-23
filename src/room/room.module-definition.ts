import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TRoomModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: ROOM_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TRoomModuleConfigurationOptions>().build();

export type RoomModuleOptions = typeof OPTIONS_TYPE;
export type RoomModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
