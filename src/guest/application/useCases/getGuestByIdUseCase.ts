import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetGuestByIdQuery } from "../ports/incoming";
import { TGuestRepository } from "../ports/outgoing/guest.repository";
import { GuestResponseDto } from "src/guest/presentation/http/dto";
import { GuestMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetGuestByIdQuery)
export class GetGuestByIdUseCase implements IQueryHandler<GetGuestByIdQuery> {
    constructor(
        private readonly repository: TGuestRepository,
    ) { }

    async execute(query: GetGuestByIdQuery): Promise<GuestResponseDto | null> {
        const guest = await this.repository.findById(query.id);
        if (!guest) {
            throw new NotFoundException(`Guest with id ${query.id} not found`);
        }
        return GuestMapper.toResponseDto(guest);
    }
}
