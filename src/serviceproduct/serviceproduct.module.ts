import { CqrsModule } from '@nestjs/cqrs';
import { ServiceproductUseCases } from './application/useCases';
import { ServiceproductController } from './presentation/http/serviceproduct.controller';
import { Module } from '@nestjs/common';
import { ServiceproductInfrastructureModule } from './infrastructure/serviceproduct-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        ServiceproductInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [ServiceproductController],
    providers: [...ServiceproductUseCases],
})
export class ServiceproductModule {}
