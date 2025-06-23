export class CreateUserCommand {
    constructor(
        public readonly fullName: string,
        public readonly email: string,
        public readonly phoneNumber?: string,
        public readonly password: string,
        public readonly role: string,
        public readonly isVerified?: boolean,
        public readonly profilePicture?: string,
        public readonly lastLoginAt?: Date,
        public readonly isActive?: boolean,
    ) { }
}
