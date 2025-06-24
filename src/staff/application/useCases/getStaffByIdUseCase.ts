import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetStaffByIdQuery } from "../ports/incoming";
import { TStaffRepository } from "../ports/outgoing/staff.repository";
import { StaffResponseDto } from "src/staff/presentation/http/dto";
import { StaffMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetStaffByIdQuery)
export class GetStaffByIdUseCase implements IQueryHandler<GetStaffByIdQuery> {
    constructor(
        private readonly repository: TStaffRepository,
    ) { }

    async execute(query: GetStaffByIdQuery): Promise<StaffResponseDto | null> {
        const staff = await this.repository.findById(query.id);
        if (!staff) {
            throw new NotFoundException(`Staff with id ${query.id} not found`);
        }
        return StaffMapper.toResponseDto(staff);
    }
}
