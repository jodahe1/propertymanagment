import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TRoomTypeRepository } from "../ports/outgoing/roomType.repository";
import { GetAllRoomTypesQuery } from "../ports/incoming";
import { RoomTypeMapper } from "../mappers";
import { RoomTypeResponseDto } from "src/roomType/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllRoomTypesQuery)
export class GetAllRoomTypesUseCase implements IQueryHandler<GetAllRoomTypesQuery> {
    constructor(
        private readonly repository: TRoomTypeRepository,
    ) { }

    async execute(query: GetAllRoomTypesQuery): Promise<PaginatedResponseDto<RoomTypeResponseDto>> {
        const roomTypes = await this.repository.findPaginated(query.queryOptions);
        return RoomTypeMapper.toPaginatedResponseDto(roomTypes);
    }
}
