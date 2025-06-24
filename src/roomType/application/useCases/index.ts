import { Provider } from "@nestjs/common";
import { CreateRoomTypeUseCase } from "./createRoomTypeUseCase";
import { GetAllRoomTypesUseCase } from "./getAllRoomTypesUseCase";
import { GetRoomTypeByIdUseCase } from "./getRoomTypeByIdUseCase";
import { DeleteRoomTypeUseCase } from "./deleteRoomTypeUseCase";
import { UpdateRoomTypeUseCase } from "./updateRoomTypeUseCase";

export const RoomTypeUseCases: Provider[] = [CreateRoomTypeUseCase, GetAllRoomTypesUseCase, GetRoomTypeByIdUseCase, DeleteRoomTypeUseCase, UpdateRoomTypeUseCase];
