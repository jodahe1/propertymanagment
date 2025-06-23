import { Provider } from "@nestjs/common";
import { CreateHotelpolicyUseCase } from "./createHotelpolicyUseCase";
import { GetAllHotelpolicysUseCase } from "./getAllHotelpolicysUseCase";
import { GetHotelpolicyByIdUseCase } from "./getHotelpolicyByIdUseCase";
import { DeleteHotelpolicyUseCase } from "./deleteHotelpolicyUseCase";
import { UpdateHotelpolicyUseCase } from "./updateHotelpolicyUseCase";

export const HotelpolicyUseCases: Provider[] = [CreateHotelpolicyUseCase, GetAllHotelpolicysUseCase, GetHotelpolicyByIdUseCase, DeleteHotelpolicyUseCase, UpdateHotelpolicyUseCase];
