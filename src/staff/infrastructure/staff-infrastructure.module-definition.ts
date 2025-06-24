import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TStaffInfrastructureConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: STAFF_INFRASTRUCTURE_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TStaffInfrastructureConfigurationOptions>().build();
