import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSuperAdminByIdQuery } from '../ports/incoming/query/get-super-admin-by-id.query'; 
import { TUserRepository } from '../ports/outgoing/user.repository';
import { SuperAdminResponseDto } from 'src/user/presentation/http/dto/super-admin-response.dto';
import { UserMapper } from '../mappers';
import { NotFoundException, UnauthorizedException } from '@nestjs/common'; 
@QueryHandler(GetSuperAdminByIdQuery)
export class GetSuperAdminByIdUseCase implements IQueryHandler<GetSuperAdminByIdQuery> {
  constructor(
    private readonly repository: TUserRepository,
  ) {}

  async execute(query: GetSuperAdminByIdQuery): Promise<SuperAdminResponseDto> {
    const user = await this.repository.findById(query.id);

    if (!user) {
      throw new NotFoundException(`SuperAdmin with id ${query.id} not found`);
    }

    
    if (!user.isSuperAdmin()) {
      throw new UnauthorizedException(`User with id ${query.id} is not a SuperAdmin.`);
    }

    return UserMapper.toResponseDto(user);
  }
}