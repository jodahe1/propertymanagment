import {
  GuestGender,
  GuestIdDocumentType,
} from '../../../../domain/valueObjects/guestEnum';

export class CreateGuestCommand {
  constructor(
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly address: string,
    public readonly country: string,
    public readonly country_num: number,
    public readonly city: string,
    public readonly postcode: string,
    public readonly gender: GuestGender,
    public readonly id_document_type: GuestIdDocumentType,
    public readonly id_number: string,
    public readonly id_issue_date: Date,
    public readonly id_expiry_date: Date,
    public readonly nationality: number,
    public readonly date_of_birth: Date,
    public readonly marketing_opt_in: boolean,
    public readonly registered_by_user_id: string,
    public readonly is_organization: boolean,
    public readonly address2?: string,
    public readonly state?: string,
    public readonly organization_name?: string,
    public readonly isActive?: boolean,
  ) {}
}
