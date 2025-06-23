import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './invoice-infrastructure.module-definition';
import { InMemoryPersistenceModule } from './adapters/in-memory/in-memory-persistence.module';
import { MikroOrmPersistenceModule } from './adapters/orm/mikro-orm-persistence.module';

@Module({})
export class InvoiceInfrastructureModule extends ConfigurableModuleClass {
  constructor() {
    super();
  }
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    super.register(options);

    const persistenceModule =
      options.storage_driver === 'in-memory'
        ? InMemoryPersistenceModule
        : MikroOrmPersistenceModule;

    return {
      module: InvoiceInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
