import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetHousekeepingByIdQuery } from "../ports/incoming";
import { THousekeepingRepository } from "../ports/outgoing/housekeeping.repository";
import { HousekeepingResponseDto } from "src/housekeeping/presentation/http/dto";
import { HousekeepingMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetHousekeepingByIdQuery)
export class GetHousekeepingByIdUseCase implements IQueryHandler<GetHousekeepingByIdQuery> {
    constructor(
        private readonly repository: THousekeepingRepository,
    ) { }

    async execute(query: GetHousekeepingByIdQuery): Promise<HousekeepingResponseDto | null> {
        const housekeeping = await this.repository.findById(query.id);
        if (!housekeeping) {
            throw new NotFoundException(`Housekeeping with id ${query.id} not found`);
        }
        return HousekeepingMapper.toResponseDto(housekeeping);
    }
}
