import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TServiceproductInfrastructureConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: SERVICEPRODUCT_INFRASTRUCTURE_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TServiceproductInfrastructureConfigurationOptions>().build();
