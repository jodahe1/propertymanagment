import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { UserPersistenceEntity } from './src/user/infrastructure/adapters/orm/persistence-entities/user.persistence.entity';
import { HotelPersistenceEntity } from './src/hotel/infrastructure/adapters/orm/persistence-entities/hotel.persistence.entity';
import { RoomTypePersistenceEntity } from './src/roomType/infrastructure/adapters/orm/persistence-entities/roomType.persistence.entity';
import { RoomPersistenceEntity } from './src/room/infrastructure/adapters/orm/persistence-entities/room.persistence.entity';
import { RoomtypeavailabilitiesPersistenceEntity } from 'src/roomtypeavailabilities/infrastructure/adapters/orm/persistence-entities/roomtypeavailabilities.persistence.entity';
import { GuestPersistenceEntity } from 'src/guest/infrastructure/adapters/orm/persistence-entities/guest.persistence.entity';
const config: Options = {
  // Required
  entities: [
    UserPersistenceEntity,
    HotelPersistenceEntity,
    RoomTypePersistenceEntity,
    RoomPersistenceEntity,
    RoomtypeavailabilitiesPersistenceEntity,
    GuestPersistenceEntity,
  ],
  entitiesTs: [
    UserPersistenceEntity,
    HotelPersistenceEntity,
    RoomTypePersistenceEntity,
    RoomPersistenceEntity,
    RoomtypeavailabilitiesPersistenceEntity,
    GuestPersistenceEntity,
  ],
  dbName: 'Propertymgt',
  driver: PostgreSqlDriver,
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Admin',
  // Optional
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{js,ts}',
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  logger: console.log.bind(console),
  seeder: {
    path: './dist/seeders',
    pathTs: './src/seeders',
  },
};

export default config;
