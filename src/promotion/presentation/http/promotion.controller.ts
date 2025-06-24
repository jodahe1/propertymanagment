import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { PromotionMapper } from 'src/promotion/application/mappers';
import { DeletePromotionCommand, GetAllPromotionsQuery, GetPromotionByIdQuery } from 'src/promotion/application/ports/incoming';
import { CreatePromotionDto, UpdatePromotionDto } from './dto';

@Controller('promotions')
export class PromotionController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all promotions' })
    @ApiResponse({ status: 200, description: 'Return all promotions.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllPromotionsQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a promotion by id' })
    @ApiResponse({ status: 200, description: 'Return the promotion.' })
    @ApiResponse({ status: 404, description: 'promotion not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetPromotionByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new promotion' })
    @ApiResponse({ status: 201, description: 'The promotion has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - promotion with this name already exists.' })
    async create(@Body() createDto: CreatePromotionDto) {
        return await this.commandBus.execute(PromotionMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a promotion' })
    @ApiResponse({ status: 200, description: 'The promotion has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'promotion not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - promotion with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdatePromotionDto) {
        return await this.commandBus.execute(PromotionMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a promotion' })
    @ApiResponse({ status: 204, description: 'The promotion has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'promotion not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeletePromotionCommand(id));    }
}
