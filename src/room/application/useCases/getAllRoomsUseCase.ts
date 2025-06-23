import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TRoomRepository } from "../ports/outgoing/room.repository";
import { GetAllRoomsQuery } from "../ports/incoming";
import { RoomMapper } from "../mappers";
import { RoomResponseDto } from "src/room/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllRoomsQuery)
export class GetAllRoomsUseCase implements IQueryHandler<GetAllRoomsQuery> {
    constructor(
        private readonly repository: TRoomRepository,
    ) { }

    async execute(query: GetAllRoomsQuery): Promise<PaginatedResponseDto<RoomResponseDto>> {
        const rooms = await this.repository.findPaginated(query.queryOptions);
        return RoomMapper.toPaginatedResponseDto(rooms);
    }
}
