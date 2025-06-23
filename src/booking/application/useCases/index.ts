import { Provider } from "@nestjs/common";
import { CreateBookingUseCase } from "./createBookingUseCase";
import { GetAllBookingsUseCase } from "./getAllBookingsUseCase";
import { GetBookingByIdUseCase } from "./getBookingByIdUseCase";
import { DeleteBookingUseCase } from "./deleteBookingUseCase";
import { UpdateBookingUseCase } from "./updateBookingUseCase";

export const BookingUseCases: Provider[] = [CreateBookingUseCase, GetAllBookingsUseCase, GetBookingByIdUseCase, DeleteBookingUseCase, UpdateBookingUseCase];
