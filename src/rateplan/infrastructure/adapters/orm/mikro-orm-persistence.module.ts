import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RateplanPersistenceEntity } from './persistence-entities/rateplan.persistence.entity';
import { TRateplanRepository } from 'src/rateplan/application/ports/outgoing/rateplan.repository';
import { RateplanRepository } from './repositories/rateplan.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([RateplanPersistenceEntity]),
  ],
  providers: [
    {
      provide: TRateplanRepository,
      useClass: RateplanRepository,
    },
  ],
  exports: [TRateplanRepository],
})
export class MikroOrmPersistenceModule {}
