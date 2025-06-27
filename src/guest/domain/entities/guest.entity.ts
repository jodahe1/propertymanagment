import { Entity } from '@shared/shared-kernel';
import { GuestGender, GuestIdDocumentType } from '../valueObjects/guestEnum';

export class Guest extends Entity {
  private _first_name: string;
  get first_name() {
    return this._first_name;
  }

  private _last_name: string;
  get last_name() {
    return this._last_name;
  }

  private _email: string;
  get email() {
    return this._email;
  }

  private _phone: string;
  get phone() {
    return this._phone;
  }

  private _address: string;
  get address() {
    return this._address;
  }

  private _country: string;
  get country() {
    return this._country;
  }

  private _country_num: number;
  get country_num() {
    return this._country_num;
  }

  private _city: string;
  get city() {
    return this._city;
  }

  private _postcode: string;
  get postcode() {
    return this._postcode;
  }

  private _gender: GuestGender;
  get gender() {
    return this._gender;
  }

  private _id_document_type: GuestIdDocumentType;
  get id_document_type() {
    return this._id_document_type;
  }

  private _id_number: string;
  get id_number() {
    return this._id_number;
  }

  private _id_issue_date: Date;
  get id_issue_date() {
    return this._id_issue_date;
  }

  private _id_expiry_date: Date;
  get id_expiry_date() {
    return this._id_expiry_date;
  }

  private _nationality: number;
  get nationality() {
    return this._nationality;
  }

  private _date_of_birth: Date;
  get date_of_birth() {
    return this._date_of_birth;
  }

  private _marketing_opt_in: boolean;
  get marketing_opt_in() {
    return this._marketing_opt_in;
  }

  private _registered_by_user_id: string;
  get registered_by_user_id() {
    return this._registered_by_user_id;
  }

  private _is_organization: boolean;
  get is_organization() {
    return this._is_organization;
  }

  private _isActive: boolean;
  get isActive() {
    return this._isActive;
  }

  private _address2?: string;
  get address2() {
    return this._address2;
  }

  private _state?: string;
  get state() {
    return this._state;
  }

  private _organization_name?: string;
  get organization_name() {
    return this._organization_name;
  }

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    country: string,
    country_num: number,
    city: string,
    postcode: string,
    gender: GuestGender,
    id_document_type: GuestIdDocumentType,
    id_number: string,
    id_issue_date: Date,
    id_expiry_date: Date,
    nationality: number,
    date_of_birth: Date,
    marketing_opt_in: boolean,
    registered_by_user_id: string,
    is_organization: boolean, // Moved before optional parameters
    // Optional parameters moved to the end
    address2?: string,
    state?: string,
    organization_name?: string,
    // Base class properties, which are optional in the super constructor, should also be at the very end
    id?: string,
    isActive?: boolean, // This was previously _isActive, ensure consistent handling or remove if it comes from base
    createdAt?: Date,
    updatedAt?: Date,
    createdBy?: string,
    updatedBy?: string,
  ) {
    super(id, createdAt, updatedAt, createdBy, updatedBy);
    this._first_name = first_name;
    this._last_name = last_name;
    this._email = email;
    this._phone = phone;
    this._address = address;
    this._country = country;
    this._country_num = country_num;
    this._city = city;
    this._postcode = postcode;
    this._gender = gender;
    this._id_document_type = id_document_type;
    this._id_number = id_number;
    this._id_issue_date = id_issue_date;
    this._id_expiry_date = id_expiry_date;
    this._nationality = nationality;
    this._date_of_birth = date_of_birth;
    this._marketing_opt_in = marketing_opt_in;
    this._registered_by_user_id = registered_by_user_id;
    this._is_organization = is_organization;
    this._address2 = address2;
    this._state = state;
    this._organization_name = organization_name;

    this._isActive = isActive !== undefined ? isActive : true;
  }

  public update(
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    country: string,
    country_num: number,
    city: string,
    postcode: string,
    gender: GuestGender,
    id_document_type: GuestIdDocumentType,
    id_number: string,
    id_issue_date: Date,
    id_expiry_date: Date,
    nationality: number,
    date_of_birth: Date,
    marketing_opt_in: boolean,
    registered_by_user_id: string,
    is_organization: boolean,

    address2?: string,
    state?: string,
    organization_name?: string,
    isActive?: boolean,
  ) {
    this._first_name = first_name;
    this._last_name = last_name;
    this._email = email;
    this._phone = phone;
    this._address = address;
    this._country = country;
    this._country_num = country_num;
    this._city = city;
    this._postcode = postcode;
    this._gender = gender;
    this._id_document_type = id_document_type;
    this._id_number = id_number;
    this._id_issue_date = id_issue_date;
    this._id_expiry_date = id_expiry_date;
    this._nationality = nationality;
    this._date_of_birth = date_of_birth;
    this._marketing_opt_in = marketing_opt_in;
    this._registered_by_user_id = registered_by_user_id;
    this._is_organization = is_organization;

    this._address2 = address2;
    this._state = state;
    this._organization_name = organization_name;

    if (isActive !== undefined) {
      this._isActive = isActive;
    }
  }
}
