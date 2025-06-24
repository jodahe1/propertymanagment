import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { HotelMapper } from 'src/hotel/application/mappers';
import { DeleteHotelCommand, GetAllHotelsQuery, GetHotelByIdQuery } from 'src/hotel/application/ports/incoming';
import { CreateHotelDto, UpdateHotelDto } from './dto';

@Controller('hotels')
export class HotelController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all hotels' })
    @ApiResponse({ status: 200, description: 'Return all hotels.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllHotelsQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a hotel by id' })
    @ApiResponse({ status: 200, description: 'Return the hotel.' })
    @ApiResponse({ status: 404, description: 'hotel not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetHotelByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new hotel' })
    @ApiResponse({ status: 201, description: 'The hotel has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - hotel with this name already exists.' })
    async create(@Body() createDto: CreateHotelDto) {
        return await this.commandBus.execute(HotelMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a hotel' })
    @ApiResponse({ status: 200, description: 'The hotel has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'hotel not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - hotel with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateHotelDto) {
        return await this.commandBus.execute(HotelMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a hotel' })
    @ApiResponse({ status: 204, description: 'The hotel has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'hotel not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteHotelCommand(id));    }
}
