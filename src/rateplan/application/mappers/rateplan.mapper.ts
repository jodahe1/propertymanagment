import { Rateplan } from 'src/rateplan/domain/entities/rateplan.entity';
import { CreateRateplanDto, UpdateRateplanDto, RateplanResponseDto } from 'src/rateplan/presentation/http/dto';
import { CreateRateplanCommand, UpdateRateplanCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class RateplanMapper {
    static createDtoToCommand(dto: CreateRateplanDto): CreateRateplanCommand {
        return new CreateRateplanCommand(
            dto.hotelId,
            dto.roomTypeId,
            dto.name,
            dto.description,
            dto.basePriceModifier,
            dto.minNights,
            dto.maxNights,
            dto.validFrom,
            dto.validTo,
            dto.status,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateRateplanDto): UpdateRateplanCommand {
        return new UpdateRateplanCommand(
            dto.id,
            dto.hotelId,
            dto.roomTypeId,
            dto.name,
            dto.description,
            dto.basePriceModifier,
            dto.minNights,
            dto.maxNights,
            dto.validFrom,
            dto.validTo,
            dto.status,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateRateplanCommand): Rateplan {
        return new Rateplan(
            command.hotelId,
            command.roomTypeId,
            command.name,
            command.description,
            command.basePriceModifier,
            command.minNights,
            command.maxNights,
            command.validFrom,
            command.validTo,
            command.status,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateRateplanCommand, rateplan: Rateplan): Rateplan {
        rateplan.update(
            command.hotelId,
            command.roomTypeId,
            command.name,
            command.description,
            command.basePriceModifier,
            command.minNights,
            command.maxNights,
            command.validFrom,
            command.validTo,
            command.status,
            command.isActive,
        );
        return rateplan;
    }

    static toResponseDto(rateplan: Rateplan): RateplanResponseDto {
        return {
            id: rateplan.id,
            hotelId: rateplan.hotelId,
            roomTypeId: rateplan.roomTypeId,
            name: rateplan.name,
            description: rateplan.description,
            basePriceModifier: rateplan.basePriceModifier,
            minNights: rateplan.minNights,
            maxNights: rateplan.maxNights,
            validFrom: rateplan.validFrom,
            validTo: rateplan.validTo,
            status: rateplan.status,
            isActive: rateplan.isActive,
            createdAt: rateplan.createdAt,
            updatedAt: rateplan.updatedAt,
            createdBy: rateplan.createdBy,
            updatedBy: rateplan.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Rateplan>): PaginatedResponseDto<RateplanResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
