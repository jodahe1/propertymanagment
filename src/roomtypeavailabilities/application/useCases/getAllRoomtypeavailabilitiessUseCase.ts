import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TRoomtypeavailabilitiesRepository } from "../ports/outgoing/roomtypeavailabilities.repository";
import { GetAllRoomtypeavailabilitiessQuery } from "../ports/incoming";
import { RoomtypeavailabilitiesMapper } from "../mappers";
import { RoomtypeavailabilitiesResponseDto } from "src/roomtypeavailabilities/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllRoomtypeavailabilitiessQuery)
export class GetAllRoomtypeavailabilitiessUseCase implements IQueryHandler<GetAllRoomtypeavailabilitiessQuery> {
    constructor(
        private readonly repository: TRoomtypeavailabilitiesRepository,
    ) { }

    async execute(query: GetAllRoomtypeavailabilitiessQuery): Promise<PaginatedResponseDto<RoomtypeavailabilitiesResponseDto>> {
        const roomtypeavailabilitiess = await this.repository.findPaginated(query.queryOptions);
        return RoomtypeavailabilitiesMapper.toPaginatedResponseDto(roomtypeavailabilitiess);
    }
}
