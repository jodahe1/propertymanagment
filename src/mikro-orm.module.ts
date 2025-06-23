import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
//import { GuestPersistenceEntity } from './guest/infrastructure/adapters/orm';
@Module({
  imports: [MikroOrmModule.forRoot()],
  exports: [MikroOrmModule],
})
export class OrmModule {}
