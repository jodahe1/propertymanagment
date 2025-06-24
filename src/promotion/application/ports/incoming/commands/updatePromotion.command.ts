export class UpdatePromotionCommand {
    constructor(
        public readonly id: string,
        public readonly hotelId: string,
        public readonly code: string,
        public readonly discountType: string,
        public readonly value: number,
        public readonly validFrom: Date,
        public readonly validTo: Date,
        public readonly minStay?: number,
        public readonly isActive?: boolean,
    ) { }
}
