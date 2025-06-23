import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetRoomtypeByIdQuery } from "../ports/incoming";
import { TRoomtypeRepository } from "../ports/outgoing/roomtype.repository";
import { RoomtypeResponseDto } from "src/roomtype/presentation/http/dto";
import { RoomtypeMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetRoomtypeByIdQuery)
export class GetRoomtypeByIdUseCase implements IQueryHandler<GetRoomtypeByIdQuery> {
    constructor(
        private readonly repository: TRoomtypeRepository,
    ) { }

    async execute(query: GetRoomtypeByIdQuery): Promise<RoomtypeResponseDto | null> {
        const roomtype = await this.repository.findById(query.id);
        if (!roomtype) {
            throw new NotFoundException(`Roomtype with id ${query.id} not found`);
        }
        return RoomtypeMapper.toResponseDto(roomtype);
    }
}
