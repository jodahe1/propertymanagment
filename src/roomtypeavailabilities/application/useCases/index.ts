import { Provider } from "@nestjs/common";
import { CreateRoomtypeavailabilitiesUseCase } from "./createRoomtypeavailabilitiesUseCase";
import { GetAllRoomtypeavailabilitiessUseCase } from "./getAllRoomtypeavailabilitiessUseCase";
import { GetRoomtypeavailabilitiesByIdUseCase } from "./getRoomtypeavailabilitiesByIdUseCase";
import { DeleteRoomtypeavailabilitiesUseCase } from "./deleteRoomtypeavailabilitiesUseCase";
import { UpdateRoomtypeavailabilitiesUseCase } from "./updateRoomtypeavailabilitiesUseCase";

export const RoomtypeavailabilitiesUseCases: Provider[] = [CreateRoomtypeavailabilitiesUseCase, GetAllRoomtypeavailabilitiessUseCase, GetRoomtypeavailabilitiesByIdUseCase, DeleteRoomtypeavailabilitiesUseCase, UpdateRoomtypeavailabilitiesUseCase];
