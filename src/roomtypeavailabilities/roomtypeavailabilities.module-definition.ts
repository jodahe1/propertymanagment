import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TRoomtypeavailabilitiesModuleConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: ROOMTYPEAVAILABILITIES_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TRoomtypeavailabilitiesModuleConfigurationOptions>().build();

export type RoomtypeavailabilitiesModuleOptions = typeof OPTIONS_TYPE;
export type RoomtypeavailabilitiesModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
