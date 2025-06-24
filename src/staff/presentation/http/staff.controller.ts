import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { StaffMapper } from 'src/staff/application/mappers';
import { DeleteStaffCommand, GetAllStaffsQuery, GetStaffByIdQuery } from 'src/staff/application/ports/incoming';
import { CreateStaffDto, UpdateStaffDto } from './dto';

@Controller('staffs')
export class StaffController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all staffs' })
    @ApiResponse({ status: 200, description: 'Return all staffs.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllStaffsQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a staff by id' })
    @ApiResponse({ status: 200, description: 'Return the staff.' })
    @ApiResponse({ status: 404, description: 'staff not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetStaffByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new staff' })
    @ApiResponse({ status: 201, description: 'The staff has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - staff with this name already exists.' })
    async create(@Body() createDto: CreateStaffDto) {
        return await this.commandBus.execute(StaffMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a staff' })
    @ApiResponse({ status: 200, description: 'The staff has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'staff not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - staff with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateStaffDto) {
        return await this.commandBus.execute(StaffMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a staff' })
    @ApiResponse({ status: 204, description: 'The staff has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'staff not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteStaffCommand(id));    }
}
