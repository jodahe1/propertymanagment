import { UserRole } from 'src/user/domain/valueObjects';
export class CreateSuperAdminCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly last_login_at?: Date,
    public readonly isActive?: boolean,
  ) {}
}
