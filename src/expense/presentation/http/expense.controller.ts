import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { ExpenseMapper } from 'src/expense/application/mappers';
import { DeleteExpenseCommand, GetAllExpensesQuery, GetExpenseByIdQuery } from 'src/expense/application/ports/incoming';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';

@Controller('expenses')
export class ExpenseController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all expenses' })
    @ApiResponse({ status: 200, description: 'Return all expenses.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllExpensesQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a expense by id' })
    @ApiResponse({ status: 200, description: 'Return the expense.' })
    @ApiResponse({ status: 404, description: 'expense not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetExpenseByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new expense' })
    @ApiResponse({ status: 201, description: 'The expense has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - expense with this name already exists.' })
    async create(@Body() createDto: CreateExpenseDto) {
        return await this.commandBus.execute(ExpenseMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a expense' })
    @ApiResponse({ status: 200, description: 'The expense has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'expense not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - expense with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateExpenseDto) {
        return await this.commandBus.execute(ExpenseMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a expense' })
    @ApiResponse({ status: 204, description: 'The expense has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'expense not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteExpenseCommand(id));    }
}
