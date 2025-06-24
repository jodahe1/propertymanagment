import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetRoomTypeByIdQuery } from "../ports/incoming";
import { TRoomTypeRepository } from "../ports/outgoing/roomType.repository";
import { RoomTypeResponseDto } from "src/roomType/presentation/http/dto";
import { RoomTypeMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetRoomTypeByIdQuery)
export class GetRoomTypeByIdUseCase implements IQueryHandler<GetRoomTypeByIdQuery> {
    constructor(
        private readonly repository: TRoomTypeRepository,
    ) { }

    async execute(query: GetRoomTypeByIdQuery): Promise<RoomTypeResponseDto | null> {
        const roomType = await this.repository.findById(query.id);
        if (!roomType) {
            throw new NotFoundException(`RoomType with id ${query.id} not found`);
        }
        return RoomTypeMapper.toResponseDto(roomType);
    }
}
