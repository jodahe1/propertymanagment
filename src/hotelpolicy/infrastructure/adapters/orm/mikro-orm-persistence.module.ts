import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HotelpolicyPersistenceEntity } from './persistence-entities/hotelpolicy.persistence.entity';
import { THotelpolicyRepository } from 'src/hotelpolicy/application/ports/outgoing/hotelpolicy.repository';
import { HotelpolicyRepository } from './repositories/hotelpolicy.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([HotelpolicyPersistenceEntity]),
  ],
  providers: [
    {
      provide: THotelpolicyRepository,
      useClass: HotelpolicyRepository,
    },
  ],
  exports: [THotelpolicyRepository],
})
export class MikroOrmPersistenceModule {}
