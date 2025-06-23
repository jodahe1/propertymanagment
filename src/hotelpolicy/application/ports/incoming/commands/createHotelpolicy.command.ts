export class CreateHotelpolicyCommand {
    constructor(
        public readonly hotelId: string,
        public readonly policyType: string,
        public readonly description: string,
        public readonly effectiveDate?: Date,
        public readonly isActive?: boolean,
    ) { }
}
