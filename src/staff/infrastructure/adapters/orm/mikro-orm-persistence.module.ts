import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StaffPersistenceEntity } from './persistence-entities/staff.persistence.entity';
import { TStaffRepository } from 'src/staff/application/ports/outgoing/staff.repository';
import { StaffRepository } from './repositories/staff.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([StaffPersistenceEntity]),
  ],
  providers: [
    {
      provide: TStaffRepository,
      useClass: StaffRepository,
    },
  ],
  exports: [TStaffRepository],
})
export class MikroOrmPersistenceModule {}
