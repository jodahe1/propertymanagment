import { CqrsModule } from '@nestjs/cqrs';
import { StaffUseCases } from './application/useCases';
import { StaffController } from './presentation/http/staff.controller';
import { Module } from '@nestjs/common';
import { StaffInfrastructureModule } from './infrastructure/staff-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        StaffInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [StaffController],
    providers: [...StaffUseCases],
})
export class StaffModule {}
