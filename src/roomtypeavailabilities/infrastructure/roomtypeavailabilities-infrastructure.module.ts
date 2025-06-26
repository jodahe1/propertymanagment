import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './roomtypeavailabilities-infrastructure.module-definition';
import { InMemoryPersistenceModule } from './adapters/in-memory/in-memory-persistence.module';
import { MikroOrmPersistenceModule } from './adapters/orm/mikro-orm-persistence.module';

@Module({})
export class RoomtypeavailabilitiesInfrastructureModule extends ConfigurableModuleClass {
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
      module: RoomtypeavailabilitiesInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
