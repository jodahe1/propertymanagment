import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from './createUserUseCase';
import { GetAllUsersUseCase } from './getAllUsersUseCase';
import { GetUserByIdUseCase } from './getUserByIdUseCase';
import { DeleteUserUseCase } from './deleteUserUseCase';
import { UpdateUserUseCase } from './updateUserUseCase';
import { CreateSuperAdminUseCase } from './create-super-admin-use-case';
import { DeleteSuperAdminUseCase } from './delete-super-admin-use-case';
import { GetSuperAdminByIdUseCase } from './get-super-admin-by-id-use-case';
export const UserUseCases: Provider[] = [
  CreateUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  DeleteUserUseCase,
  UpdateUserUseCase,
  CreateSuperAdminUseCase,
  DeleteSuperAdminUseCase,
  GetSuperAdminByIdUseCase,
];
