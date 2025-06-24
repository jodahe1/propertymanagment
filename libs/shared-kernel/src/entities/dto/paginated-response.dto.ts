import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
    IsInt,
    IsObject,
    IsOptional,
    IsString,
    Min,
} from "class-validator";

export class PaginatedResponseDto<T> {
    @ApiProperty()
    @IsInt()
    @Min(1)
    pageNumber: number = 1;

    @ApiProperty()
    @IsInt()
    @Min(1)
    pageSize: number = 10;

    @ApiProperty()
    @IsInt()
    @Min(0)
    totalCount: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    orderBy?: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    ascending?: boolean = true;

    @ApiProperty()
    @IsObject()
    @IsOptional()
    filter?: Record<string, any>;

    @ApiProperty()
    items: T[] = [];

    @ApiProperty({
        description:
            "Total number of pages based on pageSize and totalCount",
    })
    @IsInt()
    @Min(0)
    totalPages: number;

    @ApiProperty({
        description: "Indicates if there is a previous page available",
    })
    @IsBoolean()
    hasPreviousPage: boolean;

    @ApiProperty({
        description: "Indicates if there is a next page available",
    })
    @IsBoolean()
    hasNextPage: boolean;

    @ApiProperty({
        description: "Indicates if the pagination configuration is valid",
    })
    @IsBoolean()
    isValid: boolean;
}
