import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HotelModule } from './hotel/hotel.module';
import config from '../mikro-orm.config';
import { HotelPersistenceEntity } from './hotel/infrastructure/adapters/orm';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { RoomTypeModule } from './roomType/roomType.module';
import { RoomtypeavailabilitiesModule } from './roomtypeavailabilities/roomtypeavailabilities.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(config),
    HotelModule,
    UserModule,
    RoomModule,
    RoomTypeModule,
    RoomtypeavailabilitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
