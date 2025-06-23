import { Booking } from 'src/booking/domain/entities/booking.entity';
import { CreateBookingDto, UpdateBookingDto, BookingResponseDto } from 'src/booking/presentation/http/dto';
import { CreateBookingCommand, UpdateBookingCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class BookingMapper {
    static createDtoToCommand(dto: CreateBookingDto): CreateBookingCommand {
        return new CreateBookingCommand(
            dto.hotelId,
            dto.guestId,
            dto.roomId,
            dto.checkInDate,
            dto.checkOutDate,
            dto.numGuests,
            dto.totalPrice,
            dto.currency,
            dto.status,
            dto.notes,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateBookingDto): UpdateBookingCommand {
        return new UpdateBookingCommand(
            dto.id,
            dto.hotelId,
            dto.guestId,
            dto.roomId,
            dto.checkInDate,
            dto.checkOutDate,
            dto.numGuests,
            dto.totalPrice,
            dto.currency,
            dto.status,
            dto.notes,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateBookingCommand): Booking {
        return new Booking(
            command.hotelId,
            command.guestId,
            command.roomId,
            command.checkInDate,
            command.checkOutDate,
            command.numGuests,
            command.totalPrice,
            command.currency,
            command.status,
            command.notes,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateBookingCommand, booking: Booking): Booking {
        booking.update(
            command.hotelId,
            command.guestId,
            command.roomId,
            command.checkInDate,
            command.checkOutDate,
            command.numGuests,
            command.totalPrice,
            command.currency,
            command.status,
            command.notes,
            command.isActive,
        );
        return booking;
    }

    static toResponseDto(booking: Booking): BookingResponseDto {
        return {
            id: booking.id,
            hotelId: booking.hotelId,
            guestId: booking.guestId,
            roomId: booking.roomId,
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
            numGuests: booking.numGuests,
            totalPrice: booking.totalPrice,
            currency: booking.currency,
            status: booking.status,
            notes: booking.notes,
            isActive: booking.isActive,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt,
            createdBy: booking.createdBy,
            updatedBy: booking.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Booking>): PaginatedResponseDto<BookingResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
