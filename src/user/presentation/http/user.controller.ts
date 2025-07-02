import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { UserMapper } from 'src/user/application/mappers';
import {
  DeleteUserCommand,
  GetAllUsersQuery,
  GetUserByIdQuery,
  CreateSuperAdminCommand,
  DeleteSuperAdminCommand,
  GetSuperAdminByIdQuery,
} from 'src/user/application/ports/incoming';
import {
  CreateUserDto,
  UpdateUserDto,
  CreateSuperAdminDto,
  SuperAdminResponseDto,
} from './dto';
import { UserRole } from 'src/user/domain/valueObjects';
interface RequestWithUser extends Request {
  user: {
    id: string;
    role: UserRole;
  };
}
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async findAll(@Query() queryDto: QueryDto) {
    return await this.queryBus.execute(
      new GetAllUsersQuery(QueryMapper.toQueryOptions(queryDto)),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  @ApiResponse({ status: 404, description: 'user not found.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - user with this name already exists.',
  })
  async create(@Body() createDto: CreateUserDto) {
    return await this.commandBus.execute(
      UserMapper.createDtoToCommand(createDto),
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'user not found.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict - user with this name already exists.',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDto,
  ) {
    return await this.commandBus.execute(UserMapper.updateDtoToCommand(data));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'user not found.' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.commandBus.execute(new DeleteUserCommand(id));
  }
  // Super Admin Side
  @Post('super-admins')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary:
      'Create a new SuperAdmin user (SUPER_ADMIN role required for requester)',
  })
  @ApiResponse({
    status: 201,
    description: 'The SuperAdmin user has been successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only SUPER_ADMIN can perform this action.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - SuperAdmin with this email already exists.',
  })
  async createSuperAdmin(
    @Body() createSuperAdminDto: CreateSuperAdminDto,
    @Req() req: RequestWithUser, // Inject the request object
  ) {
    // Check if the requesting user has the SUPER_ADMIN role
    if (!req.user || req.user.role !== UserRole.SUPER_ADMIN) {
      throw new UnauthorizedException(
        'Only SUPER_ADMIN users can create SuperAdmins.',
      );
    }

    return await this.commandBus.execute(
      new CreateSuperAdminCommand(
        createSuperAdminDto.email,
        createSuperAdminDto.password,
        createSuperAdminDto.last_login_at,
        createSuperAdminDto.isActive,
      ),
    );
  }

  @Get('super-admins/:id')
  @ApiOperation({
    summary:
      'Get a SuperAdmin user by id (SUPER_ADMIN role required for requester)',
  })
  @ApiResponse({ status: 200, description: 'Return the SuperAdmin user.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only SUPER_ADMIN can perform this action.',
  })
  @ApiResponse({ status: 404, description: 'SuperAdmin user not found.' })
  async findSuperAdminOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: RequestWithUser, // Inject the request object
  ): Promise<SuperAdminResponseDto> {
    // Check if the requesting user has the SUPER_ADMIN role
    if (!req.user || req.user.role !== UserRole.SUPER_ADMIN) {
      throw new UnauthorizedException(
        'Only SUPER_ADMIN users can view SuperAdmins.',
      );
    }
    return await this.queryBus.execute(new GetSuperAdminByIdQuery(id));
  }

  @Delete('super-admins/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary:
      'Delete a SuperAdmin user (SUPER_ADMIN role required for requester)',
  })
  @ApiResponse({
    status: 204,
    description: 'The SuperAdmin user has been successfully deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only SUPER_ADMIN can perform this action.',
  })
  @ApiResponse({ status: 404, description: 'SuperAdmin user not found.' })
  async deleteSuperAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: RequestWithUser, // Inject the request object
  ): Promise<string> {
    // Check if the requesting user has the SUPER_ADMIN role
    if (!req.user || req.user.role !== UserRole.SUPER_ADMIN) {
      throw new UnauthorizedException(
        'Only SUPER_ADMIN users can delete SuperAdmins.',
      );
    }
    return await this.commandBus.execute(new DeleteSuperAdminCommand(id));
  }
}
