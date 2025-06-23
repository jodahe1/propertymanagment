import { PaginatedResponseDto } from '../entities/paginated-response.dto';
import { PaginatedResult } from '../repository/base.repository';

export class PaginationMapper {
    public static toPaginatedResponseDto<T, R>(
        paginatedResult: PaginatedResult<T>,
        responseDtoMapper: (item: T) => R
    ): PaginatedResponseDto<R> {

        const dto = new PaginatedResponseDto<R>();
        dto.pageNumber = paginatedResult.page;
        dto.pageSize = paginatedResult.limit;
        dto.totalCount = paginatedResult.total;
        dto.totalPages = paginatedResult.totalPages;
        dto.items = paginatedResult.data.map(responseDtoMapper);
        dto.hasPreviousPage = paginatedResult.hasPrev;
        dto.hasNextPage = paginatedResult.hasNext;
        dto.isValid = this.isValidPagination(paginatedResult);

        return dto;
    }

    private static isValidPagination<T>(paginatedResult: PaginatedResult<T>): boolean {
        return (
            paginatedResult.page > 0 &&
            paginatedResult.limit > 0 &&
            paginatedResult.total >= 0 &&
            paginatedResult.totalPages >= 0 &&
            paginatedResult.page <= Math.max(1, paginatedResult.totalPages)
        );
    }
}
