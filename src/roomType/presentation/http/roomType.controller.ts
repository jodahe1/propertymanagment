import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { RoomTypeMapper } from 'src/roomType/application/mappers';
import { DeleteRoomTypeCommand, GetAllRoomTypesQuery, GetRoomTypeByIdQuery } from 'src/roomType/application/ports/incoming';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from './dto';

@Controller('roomTypes')
export class RoomTypeController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all roomTypes' })
    @ApiResponse({ status: 200, description: 'Return all roomTypes.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllRoomTypesQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a roomType by id' })
    @ApiResponse({ status: 200, description: 'Return the roomType.' })
    @ApiResponse({ status: 404, description: 'roomType not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetRoomTypeByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new roomType' })
    @ApiResponse({ status: 201, description: 'The roomType has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - roomType with this name already exists.' })
    async create(@Body() createDto: CreateRoomTypeDto) {
        return await this.commandBus.execute(RoomTypeMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a roomType' })
    @ApiResponse({ status: 200, description: 'The roomType has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'roomType not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - roomType with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateRoomTypeDto) {
        return await this.commandBus.execute(RoomTypeMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a roomType' })
    @ApiResponse({ status: 204, description: 'The roomType has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'roomType not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteRoomTypeCommand(id));    }
}
