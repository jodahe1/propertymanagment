import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './roomType-infrastructure.module-definition';
import { InMemoryPersistenceModule } from './adapters/in-memory/in-memory-persistence.module';
import { MikroOrmPersistenceModule } from './adapters/orm/mikro-orm-persistence.module';

@Module({})
export class RoomTypeInfrastructureModule extends ConfigurableModuleClass {
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
      module: RoomTypeInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
