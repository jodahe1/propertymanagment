export class UpdateExpenseCommand {
    constructor(
        public readonly id: string,
        public readonly hotelId: string,
        public readonly category: string,
        public readonly amount: number,
        public readonly currency: string,
        public readonly description?: string,
        public readonly expenseDate: Date,
        public readonly receiptUrl?: string,
        public readonly isActive?: boolean,
    ) { }
}
