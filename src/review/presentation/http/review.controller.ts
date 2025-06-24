import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto, QueryMapper } from '@shared/shared-kernel';
import { ReviewMapper } from 'src/review/application/mappers';
import { DeleteReviewCommand, GetAllReviewsQuery, GetReviewByIdQuery } from 'src/review/application/ports/incoming';
import { CreateReviewDto, UpdateReviewDto } from './dto';

@Controller('reviews')
export class ReviewController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all reviews' })
    @ApiResponse({ status: 200, description: 'Return all reviews.' })
    async findAll(@Query() queryDto: QueryDto) {
        return await this.queryBus.execute(new GetAllReviewsQuery(QueryMapper.toQueryOptions(queryDto)));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a review by id' })
    @ApiResponse({ status: 200, description: 'Return the review.' })
    @ApiResponse({ status: 404, description: 'review not found.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.queryBus.execute(new GetReviewByIdQuery(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new review' })
    @ApiResponse({ status: 201, description: 'The review has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict - review with this name already exists.' })
    async create(@Body() createDto: CreateReviewDto) {
        return await this.commandBus.execute(ReviewMapper.createDtoToCommand(createDto));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a review' })
    @ApiResponse({ status: 200, description: 'The review has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'review not found.' })
    @ApiResponse({ status: 409, description: 'Conflict - review with this name already exists.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateReviewDto) {
        return await this.commandBus.execute(ReviewMapper.updateDtoToCommand(data));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a review' })
    @ApiResponse({ status: 204, description: 'The review has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'review not found.' })
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.commandBus.execute(new DeleteReviewCommand(id));    }
}
