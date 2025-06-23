import { CqrsModule } from '@nestjs/cqrs';
import { GuestUseCases } from './application/useCases';
import { GuestController } from './presentation/http/guest.controller';
import { Module } from '@nestjs/common';
import { GuestInfrastructureModule } from './infrastructure/guest-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        GuestInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [GuestController],
    providers: [...GuestUseCases],
})
export class GuestModule {}
