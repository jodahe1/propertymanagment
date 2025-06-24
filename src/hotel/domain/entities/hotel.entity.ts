import { Entity } from '@shared/shared-kernel';
import { HotelStatus } from '../valueObjects';

export class Hotel extends Entity {
  private _user_id: string;
  get user_id() {
    return this._user_id;
  }

  private _name: string;
  get name() {
    return this._name;
  }

  private _address: string;
  get address() {
    return this._address;
  }

  private _city: string;
  get city() {
    return this._city;
  }

  private _country: string;
  get country() {
    return this._country;
  }

  private _status: HotelStatus;
  get status(): HotelStatus {
    return this._status;
  }

  private _description?: string;
  get description() {
    return this._description;
  }

  private _zip_code?: string;
  get zip_code() {
    return this._zip_code;
  }

  private _latitude?: number;
  get latitude() {
    return this._latitude;
  }

  private _longitude?: number;
  get longitude() {
    return this._longitude;
  }

  private _contact_email?: string;
  get contact_email() {
    return this._contact_email;
  }

  private _contact_phone?: string;
  get contact_phone() {
    return this._contact_phone;
  }

  private _star_rating?: number;
  get star_rating() {
    return this._star_rating;
  }

  private _timezone?: string;
  get timezone() {
    return this._timezone;
  }

  private _images?: string[];
  get images() {
    return this._images;
  }

  private _amenities?: string[];
  get amenities() {
    return this._amenities;
  }

  private _check_in_instructions?: string;
  get check_in_instructions() {
    return this._check_in_instructions;
  }

  private _legal_information?: string;
  get legal_information() {
    return this._legal_information;
  }

  private _isActive: boolean;
  get isActive() {
    return this._isActive;
  }

  constructor(
    user_id: string,
    name: string,
    address: string,
    city: string,
    country: string,
    status: HotelStatus,

    description?: string,
    zip_code?: string,
    latitude?: number,
    longitude?: number,
    contact_email?: string,
    contact_phone?: string,
    star_rating?: number,
    timezone?: string,
    images?: string[],
    amenities?: string[],
    check_in_instructions?: string,
    legal_information?: string,
    id?: string,
    isActive: boolean = true,
    createdAt?: Date,
    updatedAt?: Date,
    createdBy?: string,
    updatedBy?: string,
  ) {
    super(id, createdAt, updatedAt, createdBy, updatedBy);

    this._user_id = user_id;
    this._name = name;
    this._address = address;
    this._city = city;
    this._country = country;
    this._status = status;

    this._description = description;
    this._zip_code = zip_code;
    this._latitude = latitude;
    this._longitude = longitude;
    this._contact_email = contact_email;
    this._contact_phone = contact_phone;
    this._star_rating = star_rating;
    this._timezone = timezone;
    this._images = images;
    this._amenities = amenities;
    this._check_in_instructions = check_in_instructions;
    this._legal_information = legal_information;
    this._isActive = isActive;
  }

  public update(
    user_id: string,
    name: string,
    address: string,
    city: string,
    country: string,
    status: HotelStatus,

    description?: string,
    zip_code?: string,
    latitude?: number,
    longitude?: number,
    contact_email?: string,
    contact_phone?: string,
    star_rating?: number,
    timezone?: string,
    images?: string[],
    amenities?: string[],
    check_in_instructions?: string,
    legal_information?: string,
    isActive?: boolean,
  ) {
    this._user_id = user_id;
    this._name = name;
    this._address = address;
    this._city = city;
    this._country = country;
    this._status = status;

    this._description = description;
    this._zip_code = zip_code;
    this._latitude = latitude;
    this._longitude = longitude;
    this._contact_email = contact_email;
    this._contact_phone = contact_phone;
    this._star_rating = star_rating;
    this._timezone = timezone;
    this._images = images;
    this._amenities = amenities;
    this._check_in_instructions = check_in_instructions;
    this._legal_information = legal_information;

    if (isActive !== undefined) {
      this._isActive = isActive;
    }
  }
}
