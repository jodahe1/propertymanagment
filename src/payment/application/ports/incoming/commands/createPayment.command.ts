export class CreatePaymentCommand {
    constructor(
        public readonly bookingId: string,
        public readonly amount: number,
        public readonly currency: string,
        public readonly paymentMethod: string,
        public readonly status: string,
        public readonly transactionReference?: string,
        public readonly paidAt: Date,
        public readonly isActive?: boolean,
    ) { }
}
