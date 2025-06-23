import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TRoomtypeInfrastructureConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: ROOMTYPE_INFRASTRUCTURE_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TRoomtypeInfrastructureConfigurationOptions>().build();
