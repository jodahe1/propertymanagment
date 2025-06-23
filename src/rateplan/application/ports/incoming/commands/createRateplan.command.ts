export class CreateRateplanCommand {
    constructor(
        public readonly hotelId: string,
        public readonly roomTypeId: string,
        public readonly name: string,
        public readonly description?: string,
        public readonly basePriceModifier: number,
        public readonly minNights?: number,
        public readonly maxNights?: number,
        public readonly validFrom?: Date,
        public readonly validTo?: Date,
        public readonly status: string,
        public readonly isActive?: boolean,
    ) { }
}
