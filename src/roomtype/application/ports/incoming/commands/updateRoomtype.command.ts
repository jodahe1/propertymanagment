export class UpdateRoomtypeCommand {
    constructor(
        public readonly id: string,
        public readonly hotelId: string,
        public readonly name: string,
        public readonly description?: string,
        public readonly maxGuests: number,
        public readonly bedType: string,
        public readonly amenities?: string[],
        public readonly basePrice: number,
        public readonly sizeSqft?: number,
        public readonly images?: string[],
        public readonly isActive?: boolean,
    ) { }
}
