import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetRoomByIdQuery } from "../ports/incoming";
import { TRoomRepository } from "../ports/outgoing/room.repository";
import { RoomResponseDto } from "src/room/presentation/http/dto";
import { RoomMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetRoomByIdQuery)
export class GetRoomByIdUseCase implements IQueryHandler<GetRoomByIdQuery> {
    constructor(
        private readonly repository: TRoomRepository,
    ) { }

    async execute(query: GetRoomByIdQuery): Promise<RoomResponseDto | null> {
        const room = await this.repository.findById(query.id);
        if (!room) {
            throw new NotFoundException(`Room with id ${query.id} not found`);
        }
        return RoomMapper.toResponseDto(room);
    }
}
