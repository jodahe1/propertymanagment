import { Invoice } from 'src/invoice/domain/entities/invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto, InvoiceResponseDto } from 'src/invoice/presentation/http/dto';
import { CreateInvoiceCommand, UpdateInvoiceCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class InvoiceMapper {
    static createDtoToCommand(dto: CreateInvoiceDto): CreateInvoiceCommand {
        return new CreateInvoiceCommand(
            dto.hotelId,
            dto.bookingId,
            dto.invoiceNumber,
            dto.amountDue,
            dto.taxes,
            dto.issuedAt,
            dto.dueDate,
            dto.status,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateInvoiceDto): UpdateInvoiceCommand {
        return new UpdateInvoiceCommand(
            dto.id,
            dto.hotelId,
            dto.bookingId,
            dto.invoiceNumber,
            dto.amountDue,
            dto.taxes,
            dto.issuedAt,
            dto.dueDate,
            dto.status,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateInvoiceCommand): Invoice {
        return new Invoice(
            command.hotelId,
            command.bookingId,
            command.invoiceNumber,
            command.amountDue,
            command.taxes,
            command.issuedAt,
            command.dueDate,
            command.status,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateInvoiceCommand, invoice: Invoice): Invoice {
        invoice.update(
            command.hotelId,
            command.bookingId,
            command.invoiceNumber,
            command.amountDue,
            command.taxes,
            command.issuedAt,
            command.dueDate,
            command.status,
            command.isActive,
        );
        return invoice;
    }

    static toResponseDto(invoice: Invoice): InvoiceResponseDto {
        return {
            id: invoice.id,
            hotelId: invoice.hotelId,
            bookingId: invoice.bookingId,
            invoiceNumber: invoice.invoiceNumber,
            amountDue: invoice.amountDue,
            taxes: invoice.taxes,
            issuedAt: invoice.issuedAt,
            dueDate: invoice.dueDate,
            status: invoice.status,
            isActive: invoice.isActive,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            createdBy: invoice.createdBy,
            updatedBy: invoice.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Invoice>): PaginatedResponseDto<InvoiceResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
