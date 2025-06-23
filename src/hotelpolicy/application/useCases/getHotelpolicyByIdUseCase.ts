import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetHotelpolicyByIdQuery } from "../ports/incoming";
import { THotelpolicyRepository } from "../ports/outgoing/hotelpolicy.repository";
import { HotelpolicyResponseDto } from "src/hotelpolicy/presentation/http/dto";
import { HotelpolicyMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetHotelpolicyByIdQuery)
export class GetHotelpolicyByIdUseCase implements IQueryHandler<GetHotelpolicyByIdQuery> {
    constructor(
        private readonly repository: THotelpolicyRepository,
    ) { }

    async execute(query: GetHotelpolicyByIdQuery): Promise<HotelpolicyResponseDto | null> {
        const hotelpolicy = await this.repository.findById(query.id);
        if (!hotelpolicy) {
            throw new NotFoundException(`Hotelpolicy with id ${query.id} not found`);
        }
        return HotelpolicyMapper.toResponseDto(hotelpolicy);
    }
}
