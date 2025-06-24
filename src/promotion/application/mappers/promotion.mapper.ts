import { Promotion } from 'src/promotion/domain/entities/promotion.entity';
import { CreatePromotionDto, UpdatePromotionDto, PromotionResponseDto } from 'src/promotion/presentation/http/dto';
import { CreatePromotionCommand, UpdatePromotionCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class PromotionMapper {
    static createDtoToCommand(dto: CreatePromotionDto): CreatePromotionCommand {
        return new CreatePromotionCommand(
            dto.hotelId,
            dto.code,
            dto.discountType,
            dto.value,
            dto.validFrom,
            dto.validTo,
            dto.minStay,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdatePromotionDto): UpdatePromotionCommand {
        return new UpdatePromotionCommand(
            dto.id,
            dto.hotelId,
            dto.code,
            dto.discountType,
            dto.value,
            dto.validFrom,
            dto.validTo,
            dto.minStay,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreatePromotionCommand): Promotion {
        return new Promotion(
            command.hotelId,
            command.code,
            command.discountType,
            command.value,
            command.validFrom,
            command.validTo,
            command.minStay,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdatePromotionCommand, promotion: Promotion): Promotion {
        promotion.update(
            command.hotelId,
            command.code,
            command.discountType,
            command.value,
            command.validFrom,
            command.validTo,
            command.minStay,
            command.isActive,
        );
        return promotion;
    }

    static toResponseDto(promotion: Promotion): PromotionResponseDto {
        return {
            id: promotion.id,
            hotelId: promotion.hotelId,
            code: promotion.code,
            discountType: promotion.discountType,
            value: promotion.value,
            validFrom: promotion.validFrom,
            validTo: promotion.validTo,
            minStay: promotion.minStay,
            isActive: promotion.isActive,
            createdAt: promotion.createdAt,
            updatedAt: promotion.updatedAt,
            createdBy: promotion.createdBy,
            updatedBy: promotion.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Promotion>): PaginatedResponseDto<PromotionResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
