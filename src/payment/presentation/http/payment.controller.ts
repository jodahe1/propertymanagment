import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { PaymentMapper } from 'src/payment/application/mappers';
import { DeletePaymentCommand, GetAllPaymentsQuery, GetPaymentByIdQuery } from 'src/payment/application/ports/incoming';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';

@Controller('payments')
export class PaymentController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all payments' })
    @ApiResponse({ status: 200, description: 'Return all payments.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllPaymentsQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a payment by id' })
    @ApiResponse({ status: 200, description: 'Return the payment.' })
    @ApiResponse({ status: 404, description: 'payment not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetPaymentByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new payment' })
    @ApiResponse({ status: 201, description: 'The payment has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - payment with this name already exists.' })
    async create(@Body() createDto: CreatePaymentDto) {
        return await this.commandBus.execute(PaymentMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a payment' })
    @ApiResponse({ status: 200, description: 'The payment has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'payment not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - payment with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdatePaymentDto) {
        return await this.commandBus.execute(PaymentMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a payment' })
    @ApiResponse({ status: 204, description: 'The payment has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'payment not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeletePaymentCommand(id));    }
}
