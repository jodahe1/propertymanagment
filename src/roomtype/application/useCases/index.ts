import { Provider } from "@nestjs/common";
import { CreateRoomtypeUseCase } from "./createRoomtypeUseCase";
import { GetAllRoomtypesUseCase } from "./getAllRoomtypesUseCase";
import { GetRoomtypeByIdUseCase } from "./getRoomtypeByIdUseCase";
import { DeleteRoomtypeUseCase } from "./deleteRoomtypeUseCase";
import { UpdateRoomtypeUseCase } from "./updateRoomtypeUseCase";

export const RoomtypeUseCases: Provider[] = [CreateRoomtypeUseCase, GetAllRoomtypesUseCase, GetRoomtypeByIdUseCase, DeleteRoomtypeUseCase, UpdateRoomtypeUseCase];
