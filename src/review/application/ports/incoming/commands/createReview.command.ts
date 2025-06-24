export class CreateReviewCommand {
    constructor(
        public readonly hotelId: string,
        public readonly guestId: string,
        public readonly rating: number,
        public readonly comment?: string,
        public readonly isActive?: boolean,
    ) { }
}
