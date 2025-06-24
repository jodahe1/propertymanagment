export class CreateUserCommand {
    constructor(
        public readonly full_name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string,
        public readonly phone_number?: string,
        public readonly is_verified?: boolean,
        public readonly profile_picture?: string,
        public readonly last_login_at?: Date,
        public readonly permissions?: string,
        public readonly isActive?: boolean,
    ) { }
}
