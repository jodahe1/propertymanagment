import { Provider } from "@nestjs/common";
import { CreateHotelUseCase } from "./createHotelUseCase";
import { GetAllHotelsUseCase } from "./getAllHotelsUseCase";
import { GetHotelByIdUseCase } from "./getHotelByIdUseCase";
import { DeleteHotelUseCase } from "./deleteHotelUseCase";
import { UpdateHotelUseCase } from "./updateHotelUseCase";

export const HotelUseCases: Provider[] = [CreateHotelUseCase, GetAllHotelsUseCase, GetHotelByIdUseCase, DeleteHotelUseCase, UpdateHotelUseCase];
