import { CqrsModule } from '@nestjs/cqrs';
import { UserUseCases } from './application/useCases';
import { UserController } from './presentation/http/user.controller';
import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from './infrastructure/user-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        UserInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [UserController],
    providers: [...UserUseCases],
})
export class UserModule {}
