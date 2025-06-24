import { Provider } from "@nestjs/common";
import { CreateHousekeepingUseCase } from "./createHousekeepingUseCase";
import { GetAllHousekeepingsUseCase } from "./getAllHousekeepingsUseCase";
import { GetHousekeepingByIdUseCase } from "./getHousekeepingByIdUseCase";
import { DeleteHousekeepingUseCase } from "./deleteHousekeepingUseCase";
import { UpdateHousekeepingUseCase } from "./updateHousekeepingUseCase";

export const HousekeepingUseCases: Provider[] = [CreateHousekeepingUseCase, GetAllHousekeepingsUseCase, GetHousekeepingByIdUseCase, DeleteHousekeepingUseCase, UpdateHousekeepingUseCase];
