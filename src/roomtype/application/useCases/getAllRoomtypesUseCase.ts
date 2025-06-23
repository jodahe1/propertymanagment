import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TRoomtypeRepository } from "../ports/outgoing/roomtype.repository";
import { GetAllRoomtypesQuery } from "../ports/incoming";
import { RoomtypeMapper } from "../mappers";
import { RoomtypeResponseDto } from "src/roomtype/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllRoomtypesQuery)
export class GetAllRoomtypesUseCase implements IQueryHandler<GetAllRoomtypesQuery> {
    constructor(
        private readonly repository: TRoomtypeRepository,
    ) { }

    async execute(query: GetAllRoomtypesQuery): Promise<PaginatedResponseDto<RoomtypeResponseDto>> {
        const roomtypes = await this.repository.findPaginated(query.queryOptions);
        return RoomtypeMapper.toPaginatedResponseDto(roomtypes);
    }
}
