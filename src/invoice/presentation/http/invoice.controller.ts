import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { InvoiceMapper } from 'src/invoice/application/mappers';
import { DeleteInvoiceCommand, GetAllInvoicesQuery, GetInvoiceByIdQuery } from 'src/invoice/application/ports/incoming';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto';

@Controller('invoices')
export class InvoiceController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all invoices' })
    @ApiResponse({ status: 200, description: 'Return all invoices.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllInvoicesQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a invoice by id' })
    @ApiResponse({ status: 200, description: 'Return the invoice.' })
    @ApiResponse({ status: 404, description: 'invoice not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetInvoiceByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new invoice' })
    @ApiResponse({ status: 201, description: 'The invoice has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - invoice with this name already exists.' })
    async create(@Body() createDto: CreateInvoiceDto) {
        return await this.commandBus.execute(InvoiceMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a invoice' })
    @ApiResponse({ status: 200, description: 'The invoice has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'invoice not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - invoice with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateInvoiceDto) {
        return await this.commandBus.execute(InvoiceMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a invoice' })
    @ApiResponse({ status: 204, description: 'The invoice has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'invoice not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteInvoiceCommand(id));    }
}
