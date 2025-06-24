import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HousekeepingPersistenceEntity } from './persistence-entities/housekeeping.persistence.entity';
import { THousekeepingRepository } from 'src/housekeeping/application/ports/outgoing/housekeeping.repository';
import { HousekeepingRepository } from './repositories/housekeeping.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([HousekeepingPersistenceEntity]),
  ],
  providers: [
    {
      provide: THousekeepingRepository,
      useClass: HousekeepingRepository,
    },
  ],
  exports: [THousekeepingRepository],
})
export class MikroOrmPersistenceModule {}
