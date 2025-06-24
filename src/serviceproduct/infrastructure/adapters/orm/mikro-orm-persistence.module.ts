import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ServiceproductPersistenceEntity } from './persistence-entities/serviceproduct.persistence.entity';
import { TServiceproductRepository } from 'src/serviceproduct/application/ports/outgoing/serviceproduct.repository';
import { ServiceproductRepository } from './repositories/serviceproduct.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([ServiceproductPersistenceEntity]),
  ],
  providers: [
    {
      provide: TServiceproductRepository,
      useClass: ServiceproductRepository,
    },
  ],
  exports: [TServiceproductRepository],
})
export class MikroOrmPersistenceModule {}
