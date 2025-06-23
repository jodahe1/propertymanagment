import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface TPaymentInfrastructureConfigurationOptions {
  storage_driver: 'orm' | 'in-memory';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: PAYMENT_INFRASTRUCTURE_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TPaymentInfrastructureConfigurationOptions>().build();
