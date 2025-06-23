export class CreateInvoiceCommand {
    constructor(
        public readonly hotelId: string,
        public readonly bookingId: string,
        public readonly invoiceNumber: string,
        public readonly amountDue: number,
        public readonly taxes?: string,
        public readonly issuedAt: Date,
        public readonly dueDate: Date,
        public readonly status: string,
        public readonly isActive?: boolean,
    ) { }
}
