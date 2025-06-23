import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { RateplanMapper } from 'src/rateplan/application/mappers';
import { DeleteRateplanCommand, GetAllRateplansQuery, GetRateplanByIdQuery } from 'src/rateplan/application/ports/incoming';
import { CreateRateplanDto, UpdateRateplanDto } from './dto';

@Controller('rateplans')
export class RateplanController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all rateplans' })
    @ApiResponse({ status: 200, description: 'Return all rateplans.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllRateplansQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a rateplan by id' })
    @ApiResponse({ status: 200, description: 'Return the rateplan.' })
    @ApiResponse({ status: 404, description: 'rateplan not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetRateplanByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new rateplan' })
    @ApiResponse({ status: 201, description: 'The rateplan has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - rateplan with this name already exists.' })
    async create(@Body() createDto: CreateRateplanDto) {
        return await this.commandBus.execute(RateplanMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a rateplan' })
    @ApiResponse({ status: 200, description: 'The rateplan has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'rateplan not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - rateplan with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateRateplanDto) {
        return await this.commandBus.execute(RateplanMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a rateplan' })
    @ApiResponse({ status: 204, description: 'The rateplan has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'rateplan not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteRateplanCommand(id));    }
}
