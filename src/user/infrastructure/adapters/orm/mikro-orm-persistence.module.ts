import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserPersistenceEntity } from './persistence-entities/user.persistence.entity';
import { TUserRepository } from 'src/user/application/ports/outgoing/user.repository';
import { UserRepository } from './repositories/user.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([UserPersistenceEntity]),
  ],
  providers: [
    {
      provide: TUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [TUserRepository],
})
export class MikroOrmPersistenceModule {}
