import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GuestPersistenceEntity } from './persistence-entities/guest.persistence.entity';
import { TGuestRepository } from 'src/guest/application/ports/outgoing/guest.repository';
import { GuestRepository } from './repositories/guest.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([GuestPersistenceEntity]),
  ],
  providers: [
    {
      provide: TGuestRepository,
      useClass: GuestRepository,
    },
  ],
  exports: [TGuestRepository],
})
export class MikroOrmPersistenceModule {}
