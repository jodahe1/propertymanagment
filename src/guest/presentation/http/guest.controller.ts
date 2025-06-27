import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { GuestMapper } from 'src/guest/application/mappers';
import { DeleteGuestCommand, GetAllGuestsQuery, GetGuestByIdQuery } from 'src/guest/application/ports/incoming';
import { CreateGuestDto, UpdateGuestDto } from './dto';

@Controller('guests')
export class GuestController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all guests' })
    @ApiResponse({ status: 200, description: 'Return all guests.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllGuestsQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a guest by id' })
    @ApiResponse({ status: 200, description: 'Return the guest.' })
    @ApiResponse({ status: 404, description: 'guest not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetGuestByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new guest' })
    @ApiResponse({ status: 201, description: 'The guest has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - guest with this name already exists.' })
    async create(@Body() createDto: CreateGuestDto) {
        return await this.commandBus.execute(GuestMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a guest' })
    @ApiResponse({ status: 200, description: 'The guest has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'guest not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - guest with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateGuestDto) {
        return await this.commandBus.execute(GuestMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a guest' })
    @ApiResponse({ status: 204, description: 'The guest has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'guest not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteGuestCommand(id));    }
}
