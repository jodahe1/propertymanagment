import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { ServiceproductMapper } from 'src/serviceproduct/application/mappers';
import { DeleteServiceproductCommand, GetAllServiceproductsQuery, GetServiceproductByIdQuery } from 'src/serviceproduct/application/ports/incoming';
import { CreateServiceproductDto, UpdateServiceproductDto } from './dto';

@Controller('serviceproducts')
export class ServiceproductController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all serviceproducts' })
    @ApiResponse({ status: 200, description: 'Return all serviceproducts.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllServiceproductsQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a serviceproduct by id' })
    @ApiResponse({ status: 200, description: 'Return the serviceproduct.' })
    @ApiResponse({ status: 404, description: 'serviceproduct not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetServiceproductByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new serviceproduct' })
    @ApiResponse({ status: 201, description: 'The serviceproduct has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - serviceproduct with this name already exists.' })
    async create(@Body() createDto: CreateServiceproductDto) {
        return await this.commandBus.execute(ServiceproductMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a serviceproduct' })
    @ApiResponse({ status: 200, description: 'The serviceproduct has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'serviceproduct not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - serviceproduct with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateServiceproductDto) {
        return await this.commandBus.execute(ServiceproductMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a serviceproduct' })
    @ApiResponse({ status: 204, description: 'The serviceproduct has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'serviceproduct not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteServiceproductCommand(id));    }
}
