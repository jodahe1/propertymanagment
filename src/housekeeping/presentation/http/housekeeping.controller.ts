import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { HousekeepingMapper } from 'src/housekeeping/application/mappers';
import { DeleteHousekeepingCommand, GetAllHousekeepingsQuery, GetHousekeepingByIdQuery } from 'src/housekeeping/application/ports/incoming';
import { CreateHousekeepingDto, UpdateHousekeepingDto } from './dto';

@Controller('housekeepings')
export class HousekeepingController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all housekeepings' })
    @ApiResponse({ status: 200, description: 'Return all housekeepings.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllHousekeepingsQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a housekeeping by id' })
    @ApiResponse({ status: 200, description: 'Return the housekeeping.' })
    @ApiResponse({ status: 404, description: 'housekeeping not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetHousekeepingByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new housekeeping' })
    @ApiResponse({ status: 201, description: 'The housekeeping has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - housekeeping with this name already exists.' })
    async create(@Body() createDto: CreateHousekeepingDto) {
        return await this.commandBus.execute(HousekeepingMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a housekeeping' })
    @ApiResponse({ status: 200, description: 'The housekeeping has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'housekeeping not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - housekeeping with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateHousekeepingDto) {
        return await this.commandBus.execute(HousekeepingMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a housekeeping' })
    @ApiResponse({ status: 204, description: 'The housekeeping has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'housekeeping not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteHousekeepingCommand(id));    }
}
