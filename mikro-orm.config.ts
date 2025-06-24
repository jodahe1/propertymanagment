import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { UserPersistenceEntity } from 'src/user/infrastructure/adapters/orm';
import { HotelPersistenceEntity } from 'src/hotel/infrastructure/adapters/orm';
import { RoomTypePersistenceEntity } from 'src/roomType/infrastructure/adapters/orm';
const config: Options = {
  // Required
  entities: [
    UserPersistenceEntity,
    HotelPersistenceEntity,
    RoomTypePersistenceEntity,
  ],
  entitiesTs: [
    UserPersistenceEntity,
    HotelPersistenceEntity,
    RoomTypePersistenceEntity,
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
