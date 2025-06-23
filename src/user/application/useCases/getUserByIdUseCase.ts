import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByIdQuery } from "../ports/incoming";
import { TUserRepository } from "../ports/outgoing/user.repository";
import { UserResponseDto } from "src/user/presentation/http/dto";
import { UserMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdUseCase implements IQueryHandler<GetUserByIdQuery> {
    constructor(
        private readonly repository: TUserRepository,
    ) { }

    async execute(query: GetUserByIdQuery): Promise<UserResponseDto | null> {
        const user = await this.repository.findById(query.id);
        if (!user) {
            throw new NotFoundException(`User with id ${query.id} not found`);
        }
        return UserMapper.toResponseDto(user);
    }
}
