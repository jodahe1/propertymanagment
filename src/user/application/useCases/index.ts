import { Provider } from "@nestjs/common";
import { CreateUserUseCase } from "./createUserUseCase";
import { GetAllUsersUseCase } from "./getAllUsersUseCase";
import { GetUserByIdUseCase } from "./getUserByIdUseCase";
import { DeleteUserUseCase } from "./deleteUserUseCase";
import { UpdateUserUseCase } from "./updateUserUseCase";

export const UserUseCases: Provider[] = [CreateUserUseCase, GetAllUsersUseCase, GetUserByIdUseCase, DeleteUserUseCase, UpdateUserUseCase];
