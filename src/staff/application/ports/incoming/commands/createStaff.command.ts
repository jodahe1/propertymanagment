export class CreateStaffCommand {
    constructor(
        public readonly hotelId: string,
        public readonly userId: string,
        public readonly position: string,
        public readonly employmentStatus: string,
        public readonly hireDate: Date,
        public readonly salary?: number,
        public readonly contactNumber?: string,
        public readonly isActive?: boolean,
    ) { }
}
