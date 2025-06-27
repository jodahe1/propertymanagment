import { Provider } from "@nestjs/common";
import { CreateGuestUseCase } from "./createGuestUseCase";
import { GetAllGuestsUseCase } from "./getAllGuestsUseCase";
import { GetGuestByIdUseCase } from "./getGuestByIdUseCase";
import { DeleteGuestUseCase } from "./deleteGuestUseCase";
import { UpdateGuestUseCase } from "./updateGuestUseCase";

export const GuestUseCases: Provider[] = [CreateGuestUseCase, GetAllGuestsUseCase, GetGuestByIdUseCase, DeleteGuestUseCase, UpdateGuestUseCase];
