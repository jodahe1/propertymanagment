import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TUserRepository } from "../ports/outgoing/user.repository";
import { GetAllUsersQuery } from "../ports/incoming";
import { UserMapper } from "../mappers";
import { UserResponseDto } from "src/user/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersUseCase implements IQueryHandler<GetAllUsersQuery> {
    constructor(
        private readonly repository: TUserRepository,
    ) { }

    async execute(query: GetAllUsersQuery): Promise<PaginatedResponseDto<UserResponseDto>> {
        const users = await this.repository.findPaginated(query.queryOptions);
        return UserMapper.toPaginatedResponseDto(users);
    }
}
