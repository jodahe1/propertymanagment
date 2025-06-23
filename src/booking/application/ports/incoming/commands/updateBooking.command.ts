export class UpdateBookingCommand {
    constructor(
        public readonly id: string,
        public readonly hotelId: string,
        public readonly guestId: string,
        public readonly roomId: string,
        public readonly checkInDate: Date,
        public readonly checkOutDate: Date,
        public readonly numGuests: number,
        public readonly totalPrice: number,
        public readonly currency: string,
        public readonly status: string,
        public readonly notes?: string,
        public readonly isActive?: boolean,
    ) { }
}
