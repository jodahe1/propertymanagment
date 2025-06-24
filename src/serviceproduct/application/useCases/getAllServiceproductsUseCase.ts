import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TServiceproductRepository } from "../ports/outgoing/serviceproduct.repository";
import { GetAllServiceproductsQuery } from "../ports/incoming";
import { ServiceproductMapper } from "../mappers";
import { ServiceproductResponseDto } from "src/serviceproduct/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllServiceproductsQuery)
export class GetAllServiceproductsUseCase implements IQueryHandler<GetAllServiceproductsQuery> {
    constructor(
        private readonly repository: TServiceproductRepository,
    ) { }

    async execute(query: GetAllServiceproductsQuery): Promise<PaginatedResponseDto<ServiceproductResponseDto>> {
        const serviceproducts = await this.repository.findPaginated(query.queryOptions);
        return ServiceproductMapper.toPaginatedResponseDto(serviceproducts);
    }
}
