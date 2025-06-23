import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { RoomtypeMapper } from 'src/roomtype/application/mappers';
import { DeleteRoomtypeCommand, GetAllRoomtypesQuery, GetRoomtypeByIdQuery } from 'src/roomtype/application/ports/incoming';
import { CreateRoomtypeDto, UpdateRoomtypeDto } from './dto';

@Controller('roomtypes')
export class RoomtypeController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all roomtypes' })
    @ApiResponse({ status: 200, description: 'Return all roomtypes.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllRoomtypesQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a roomtype by id' })
    @ApiResponse({ status: 200, description: 'Return the roomtype.' })
    @ApiResponse({ status: 404, description: 'roomtype not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetRoomtypeByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new roomtype' })
    @ApiResponse({ status: 201, description: 'The roomtype has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - roomtype with this name already exists.' })
    async create(@Body() createDto: CreateRoomtypeDto) {
        return await this.commandBus.execute(RoomtypeMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a roomtype' })
    @ApiResponse({ status: 200, description: 'The roomtype has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'roomtype not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - roomtype with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateRoomtypeDto) {
        return await this.commandBus.execute(RoomtypeMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a roomtype' })
    @ApiResponse({ status: 204, description: 'The roomtype has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'roomtype not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteRoomtypeCommand(id));    }
}
