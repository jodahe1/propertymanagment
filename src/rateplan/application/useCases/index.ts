import { Provider } from "@nestjs/common";
import { CreateRateplanUseCase } from "./createRateplanUseCase";
import { GetAllRateplansUseCase } from "./getAllRateplansUseCase";
import { GetRateplanByIdUseCase } from "./getRateplanByIdUseCase";
import { DeleteRateplanUseCase } from "./deleteRateplanUseCase";
import { UpdateRateplanUseCase } from "./updateRateplanUseCase";

export const RateplanUseCases: Provider[] = [CreateRateplanUseCase, GetAllRateplansUseCase, GetRateplanByIdUseCase, DeleteRateplanUseCase, UpdateRateplanUseCase];
