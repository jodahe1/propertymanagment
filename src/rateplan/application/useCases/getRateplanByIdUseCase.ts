import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetRateplanByIdQuery } from "../ports/incoming";
import { TRateplanRepository } from "../ports/outgoing/rateplan.repository";
import { RateplanResponseDto } from "src/rateplan/presentation/http/dto";
import { RateplanMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetRateplanByIdQuery)
export class GetRateplanByIdUseCase implements IQueryHandler<GetRateplanByIdQuery> {
    constructor(
        private readonly repository: TRateplanRepository,
    ) { }

    async execute(query: GetRateplanByIdQuery): Promise<RateplanResponseDto | null> {
        const rateplan = await this.repository.findById(query.id);
        if (!rateplan) {
            throw new NotFoundException(`Rateplan with id ${query.id} not found`);
        }
        return RateplanMapper.toResponseDto(rateplan);
    }
}
