import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetRoomtypeavailabilitiesByIdQuery } from "../ports/incoming";
import { TRoomtypeavailabilitiesRepository } from "../ports/outgoing/roomtypeavailabilities.repository";
import { RoomtypeavailabilitiesResponseDto } from "src/roomtypeavailabilities/presentation/http/dto";
import { RoomtypeavailabilitiesMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetRoomtypeavailabilitiesByIdQuery)
export class GetRoomtypeavailabilitiesByIdUseCase implements IQueryHandler<GetRoomtypeavailabilitiesByIdQuery> {
    constructor(
        private readonly repository: TRoomtypeavailabilitiesRepository,
    ) { }

    async execute(query: GetRoomtypeavailabilitiesByIdQuery): Promise<RoomtypeavailabilitiesResponseDto | null> {
        const roomtypeavailabilities = await this.repository.findById(query.id);
        if (!roomtypeavailabilities) {
            throw new NotFoundException(`Roomtypeavailabilities with id ${query.id} not found`);
        }
        return RoomtypeavailabilitiesMapper.toResponseDto(roomtypeavailabilities);
    }
}
