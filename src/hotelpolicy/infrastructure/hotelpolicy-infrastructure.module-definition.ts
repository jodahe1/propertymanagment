import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface THotelpolicyInfrastructureConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: HOTELPOLICY_INFRASTRUCTURE_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<THotelpolicyInfrastructureConfigurationOptions>().build();
