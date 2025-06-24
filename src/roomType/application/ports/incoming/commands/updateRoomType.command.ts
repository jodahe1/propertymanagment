export class UpdateRoomTypeCommand {
    constructor(
        public readonly id: string,
        public readonly hotel_id: string,
        public readonly name: string,
        public readonly max_guests: number,
        public readonly max_adults: number,
        public readonly max_children: number,
        public readonly bed_type: string,
        public readonly base_price: number,
        public readonly quantity: number,
        public readonly description?: string,
        public readonly amenities?: string[],
        public readonly size_sqm?: number,
        public readonly extra_bed_capacity?: number,
        public readonly isActive?: boolean,
    ) { }
}
