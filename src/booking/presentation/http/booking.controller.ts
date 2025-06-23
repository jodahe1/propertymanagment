import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { BookingMapper } from 'src/booking/application/mappers';
import { DeleteBookingCommand, GetAllBookingsQuery, GetBookingByIdQuery } from 'src/booking/application/ports/incoming';
import { CreateBookingDto, UpdateBookingDto } from './dto';

@Controller('bookings')
export class BookingController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all bookings' })
    @ApiResponse({ status: 200, description: 'Return all bookings.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllBookingsQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a booking by id' })
    @ApiResponse({ status: 200, description: 'Return the booking.' })
    @ApiResponse({ status: 404, description: 'booking not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetBookingByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new booking' })
    @ApiResponse({ status: 201, description: 'The booking has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - booking with this name already exists.' })
    async create(@Body() createDto: CreateBookingDto) {
        return await this.commandBus.execute(BookingMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a booking' })
    @ApiResponse({ status: 200, description: 'The booking has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'booking not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - booking with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateBookingDto) {
        return await this.commandBus.execute(BookingMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a booking' })
    @ApiResponse({ status: 204, description: 'The booking has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'booking not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteBookingCommand(id));    }
}
