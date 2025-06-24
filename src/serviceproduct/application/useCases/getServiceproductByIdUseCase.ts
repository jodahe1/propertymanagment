import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetServiceproductByIdQuery } from "../ports/incoming";
import { TServiceproductRepository } from "../ports/outgoing/serviceproduct.repository";
import { ServiceproductResponseDto } from "src/serviceproduct/presentation/http/dto";
import { ServiceproductMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetServiceproductByIdQuery)
export class GetServiceproductByIdUseCase implements IQueryHandler<GetServiceproductByIdQuery> {
    constructor(
        private readonly repository: TServiceproductRepository,
    ) { }

    async execute(query: GetServiceproductByIdQuery): Promise<ServiceproductResponseDto | null> {
        const serviceproduct = await this.repository.findById(query.id);
        if (!serviceproduct) {
            throw new NotFoundException(`Serviceproduct with id ${query.id} not found`);
        }
        return ServiceproductMapper.toResponseDto(serviceproduct);
    }
}
