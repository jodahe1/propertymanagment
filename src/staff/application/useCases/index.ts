import { Provider } from "@nestjs/common";
import { CreateStaffUseCase } from "./createStaffUseCase";
import { GetAllStaffsUseCase } from "./getAllStaffsUseCase";
import { GetStaffByIdUseCase } from "./getStaffByIdUseCase";
import { DeleteStaffUseCase } from "./deleteStaffUseCase";
import { UpdateStaffUseCase } from "./updateStaffUseCase";

export const StaffUseCases: Provider[] = [CreateStaffUseCase, GetAllStaffsUseCase, GetStaffByIdUseCase, DeleteStaffUseCase, UpdateStaffUseCase];
