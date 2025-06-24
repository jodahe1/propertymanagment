import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TStaffRepository } from "../ports/outgoing/staff.repository";
import { GetAllStaffsQuery } from "../ports/incoming";
import { StaffMapper } from "../mappers";
import { StaffResponseDto } from "src/staff/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllStaffsQuery)
export class GetAllStaffsUseCase implements IQueryHandler<GetAllStaffsQuery> {
    constructor(
        private readonly repository: TStaffRepository,
    ) { }

    async execute(query: GetAllStaffsQuery): Promise<PaginatedResponseDto<StaffResponseDto>> {
        const staffs = await this.repository.findPaginated(query.queryOptions);
        return StaffMapper.toPaginatedResponseDto(staffs);
    }
}
