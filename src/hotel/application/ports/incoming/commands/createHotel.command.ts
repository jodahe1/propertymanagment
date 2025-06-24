export class CreateHotelCommand {
    constructor(
        public readonly user_id: string,
        public readonly name: string,
        public readonly address: string,
        public readonly city: string,
        public readonly country: string,
        public readonly status: string,
        public readonly description?: string,
        public readonly zip_code?: string,
        public readonly latitude?: number,
        public readonly longitude?: number,
        public readonly contact_email?: string,
        public readonly contact_phone?: string,
        public readonly star_rating?: number,
        public readonly timezone?: string,
        public readonly images?: string[],
        public readonly amenities?: string[],
        public readonly check_in_instructions?: string,
        public readonly legal_information?: string,
        public readonly isActive?: boolean,
    ) { }
}
