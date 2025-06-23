export class UpdateHotelCommand {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly name: string,
        public readonly description?: string,
        public readonly address: string,
        public readonly city: string,
        public readonly country: string,
        public readonly zipCode?: string,
        public readonly latitude?: number,
        public readonly longitude?: number,
        public readonly contactEmail: string,
        public readonly contactPhone: string,
        public readonly starRating?: number,
        public readonly status: string,
        public readonly timezone?: string,
        public readonly images?: string[],
        public readonly isActive?: boolean,
    ) { }
}
