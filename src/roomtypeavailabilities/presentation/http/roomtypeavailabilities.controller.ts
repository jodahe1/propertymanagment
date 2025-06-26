import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { RoomtypeavailabilitiesMapper } from 'src/roomtypeavailabilities/application/mappers';
import { DeleteRoomtypeavailabilitiesCommand, GetAllRoomtypeavailabilitiessQuery, GetRoomtypeavailabilitiesByIdQuery } from 'src/roomtypeavailabilities/application/ports/incoming';
import { CreateRoomtypeavailabilitiesDto, UpdateRoomtypeavailabilitiesDto } from './dto';

@Controller('roomtypeavailabilitiess')
export class RoomtypeavailabilitiesController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all roomtypeavailabilitiess' })
    @ApiResponse({ status: 200, description: 'Return all roomtypeavailabilitiess.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllRoomtypeavailabilitiessQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a roomtypeavailabilities by id' })
    @ApiResponse({ status: 200, description: 'Return the roomtypeavailabilities.' })
    @ApiResponse({ status: 404, description: 'roomtypeavailabilities not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetRoomtypeavailabilitiesByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new roomtypeavailabilities' })
    @ApiResponse({ status: 201, description: 'The roomtypeavailabilities has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - roomtypeavailabilities with this name already exists.' })
    async create(@Body() createDto: CreateRoomtypeavailabilitiesDto) {
        return await this.commandBus.execute(RoomtypeavailabilitiesMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a roomtypeavailabilities' })
    @ApiResponse({ status: 200, description: 'The roomtypeavailabilities has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'roomtypeavailabilities not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - roomtypeavailabilities with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateRoomtypeavailabilitiesDto) {
        return await this.commandBus.execute(RoomtypeavailabilitiesMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a roomtypeavailabilities' })
    @ApiResponse({ status: 204, description: 'The roomtypeavailabilities has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'roomtypeavailabilities not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteRoomtypeavailabilitiesCommand(id));    }
}
