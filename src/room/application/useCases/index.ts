import { Provider } from "@nestjs/common";
import { CreateRoomUseCase } from "./createRoomUseCase";
import { GetAllRoomsUseCase } from "./getAllRoomsUseCase";
import { GetRoomByIdUseCase } from "./getRoomByIdUseCase";
import { DeleteRoomUseCase } from "./deleteRoomUseCase";
import { UpdateRoomUseCase } from "./updateRoomUseCase";

export const RoomUseCases: Provider[] = [CreateRoomUseCase, GetAllRoomsUseCase, GetRoomByIdUseCase, DeleteRoomUseCase, UpdateRoomUseCase];
