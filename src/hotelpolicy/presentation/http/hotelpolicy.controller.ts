import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { HotelpolicyMapper } from 'src/hotelpolicy/application/mappers';
import { DeleteHotelpolicyCommand, GetAllHotelpolicysQuery, GetHotelpolicyByIdQuery } from 'src/hotelpolicy/application/ports/incoming';
import { CreateHotelpolicyDto, UpdateHotelpolicyDto } from './dto';

@Controller('hotelpolicys')
export class HotelpolicyController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all hotelpolicys' })
    @ApiResponse({ status: 200, description: 'Return all hotelpolicys.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllHotelpolicysQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a hotelpolicy by id' })
    @ApiResponse({ status: 200, description: 'Return the hotelpolicy.' })
    @ApiResponse({ status: 404, description: 'hotelpolicy not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetHotelpolicyByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new hotelpolicy' })
    @ApiResponse({ status: 201, description: 'The hotelpolicy has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - hotelpolicy with this name already exists.' })
    async create(@Body() createDto: CreateHotelpolicyDto) {
        return await this.commandBus.execute(HotelpolicyMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a hotelpolicy' })
    @ApiResponse({ status: 200, description: 'The hotelpolicy has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'hotelpolicy not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - hotelpolicy with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateHotelpolicyDto) {
        return await this.commandBus.execute(HotelpolicyMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a hotelpolicy' })
    @ApiResponse({ status: 204, description: 'The hotelpolicy has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'hotelpolicy not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteHotelpolicyCommand(id));    }
}
