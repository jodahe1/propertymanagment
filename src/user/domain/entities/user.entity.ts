import { Entity } from '@shared/shared-kernel';
import { UserRole } from '../valueObjects';
import { Hotel } from 'src/hotel/domain/entities';
export class User extends Entity {
  private _full_name: string;
  get full_name() {
    return this._full_name;
  }

  private _email: string;
  get email() {
    return this._email;
  }

  private _password: string;
  get password() {
    return this._password;
  }

  private _role: UserRole;
  get role() {
    return this._role;
  }

  private _phone_number?: string;
  get phone_number() {
    return this._phone_number;
  }

  private _is_verified?: boolean;
  get is_verified() {
    return this._is_verified;
  }

  private _profile_picture?: string;
  get profile_picture() {
    return this._profile_picture;
  }

  private _last_login_at?: Date;
  get last_login_at() {
    return this._last_login_at;
  }

  private _permissions?: string;
  get permissions() {
    return this._permissions;
  }

  private _isActive: boolean;
  get isActive() {
    return this._isActive;
  }

  // Add the collection for Hotels
  private _hotels: Hotel[]; // This represents the One-to-Many relationship
  get hotels(): Hotel[] {
    return this._hotels;
  }

  constructor(
    full_name: string,
    email: string,
    password: string,
    role: UserRole,
    phone_number?: string,
    is_verified?: boolean,
    profile_picture?: string,
    last_login_at?: Date,
    permissions?: string,
    isActive?: boolean,
    hotels: Hotel[] = [], // Initialize hotels array, assuming it can be empty
    //base class properties,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    createdBy?: string,
    updatedBy?: string,
  ) {
    super(id, createdAt, updatedAt, createdBy, updatedBy);
    this._full_name = full_name;
    this._email = email;
    this._password = password;
    this._role = role;
    this._phone_number = phone_number;
    this._is_verified = is_verified;
    this._profile_picture = profile_picture;
    this._last_login_at = last_login_at;
    this._permissions = permissions;
    this._isActive = isActive || false;
    this._hotels = hotels; // Assign the collection
  }

  public update(
    full_name: string,
    email: string,
    password: string,
    role: UserRole,
    phone_number?: string,
    is_verified?: boolean,
    profile_picture?: string,
    last_login_at?: Date,
    permissions?: string,
    isActive?: boolean,
    // Note: Updating collections in an `update` method directly is often more complex
    // and might involve separate methods for adding/removing items.
    // For simplicity, we are not adding hotels to `update` for now.
  ) {
    this._full_name = full_name;
    this._email = email;
    this._phone_number = phone_number;
    this._password = password;
    this._role = role;
    this._is_verified = is_verified;
    this._profile_picture = profile_picture;
    this._last_login_at = last_login_at;
    this._permissions = permissions;
    this._isActive = isActive;
  }
}
