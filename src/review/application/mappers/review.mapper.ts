import { Review } from 'src/review/domain/entities/review.entity';
import { CreateReviewDto, UpdateReviewDto, ReviewResponseDto } from 'src/review/presentation/http/dto';
import { CreateReviewCommand, UpdateReviewCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class ReviewMapper {
    static createDtoToCommand(dto: CreateReviewDto): CreateReviewCommand {
        return new CreateReviewCommand(
            dto.hotelId,
            dto.guestId,
            dto.rating,
            dto.comment,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateReviewDto): UpdateReviewCommand {
        return new UpdateReviewCommand(
            dto.id,
            dto.hotelId,
            dto.guestId,
            dto.rating,
            dto.comment,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateReviewCommand): Review {
        return new Review(
            command.hotelId,
            command.guestId,
            command.rating,
            command.comment,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateReviewCommand, review: Review): Review {
        review.update(
            command.hotelId,
            command.guestId,
            command.rating,
            command.comment,
            command.isActive,
        );
        return review;
    }

    static toResponseDto(review: Review): ReviewResponseDto {
        return {
            id: review.id,
            hotelId: review.hotelId,
            guestId: review.guestId,
            rating: review.rating,
            comment: review.comment,
            isActive: review.isActive,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            createdBy: review.createdBy,
            updatedBy: review.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Review>): PaginatedResponseDto<ReviewResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
