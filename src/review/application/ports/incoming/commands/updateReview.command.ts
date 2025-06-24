export class UpdateReviewCommand {
    constructor(
        public readonly id: string,
        public readonly hotelId: string,
        public readonly guestId: string,
        public readonly rating: number,
        public readonly comment?: string,
        public readonly isActive?: boolean,
    ) { }
}
