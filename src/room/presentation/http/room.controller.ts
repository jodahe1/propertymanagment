import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { RoomMapper } from 'src/room/application/mappers';
import { DeleteRoomCommand, GetAllRoomsQuery, GetRoomByIdQuery } from 'src/room/application/ports/incoming';
import { CreateRoomDto, UpdateRoomDto } from './dto';

@Controller('rooms')
export class RoomController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all rooms' })
    @ApiResponse({ status: 200, description: 'Return all rooms.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllRoomsQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a room by id' })
    @ApiResponse({ status: 200, description: 'Return the room.' })
    @ApiResponse({ status: 404, description: 'room not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetRoomByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new room' })
    @ApiResponse({ status: 201, description: 'The room has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - room with this name already exists.' })
    async create(@Body() createDto: CreateRoomDto) {
        return await this.commandBus.execute(RoomMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a room' })
    @ApiResponse({ status: 200, description: 'The room has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'room not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - room with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateRoomDto) {
        return await this.commandBus.execute(RoomMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a room' })
    @ApiResponse({ status: 204, description: 'The room has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'room not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteRoomCommand(id));    }
}
