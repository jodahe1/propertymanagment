export class UpdateGuestCommand {
    constructor(
        public readonly id: string,
        public readonly fullName: string,
        public readonly email: string,
        public readonly phoneNumber?: string,
        public readonly address?: string,
        public readonly city?: string,
        public readonly country?: string,
        public readonly zipCode?: string,
        public readonly dateOfBirth?: Date,
        public readonly nationality?: string,
        public readonly idDocumentType: string,
        public readonly idDocumentNumber: string,
        public readonly notes?: string,
        public readonly isActive?: boolean,
    ) { }
}
