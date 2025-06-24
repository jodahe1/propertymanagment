import { Entity } from '@shared/shared-kernel';
import { AvailabilityStatus } from '../valueObjects';
export class Room extends Entity {
  private _hotel_id: string;
  get hotel_id() {
    return this._hotel_id;
  }

  private _room_type_id: string;
  get room_type_id() {
    return this._room_type_id;
  }

  private _room_number: string;
  get room_number() {
    return this._room_number;
  }

  private _floor_number?: number;
  get floor_number() {
    return this._floor_number;
  }

  private _availability_status: AvailabilityStatus;
  get availability_status() {
    return this._availability_status;
  }

  private _current_price: number;
  get current_price() {
    return this._current_price;
  }

  private _notes?: string;
  get notes() {
    return this._notes;
  }

  private _isActive: boolean;
  get isActive() {
    return this._isActive;
  }

  constructor(
    hotel_id: string,
    room_type_id: string,
    room_number: string,
    availability_status: AvailabilityStatus,
    current_price: number,
    floor_number?: number,
    notes?: string,
    //base class properties
    id?: string,
    isActive?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    createdBy?: string,
    updatedBy?: string,
  ) {
    super(id, createdAt, updatedAt, createdBy, updatedBy);
    this._hotel_id = hotel_id;
    this._room_type_id = room_type_id;
    this._room_number = room_number;
    this._availability_status = availability_status;
    this._current_price = current_price;
    this._floor_number = floor_number;
    this._notes = notes;
    this._isActive = isActive;
  }

  public update(
    hotel_id: string,
    room_type_id: string,
    room_number: string,
    availability_status: AvailabilityStatus,
    current_price: number,
    floor_number?: number,
    notes?: string,
    isActive?: boolean,
  ) {
    this._hotel_id = hotel_id;
    this._room_type_id = room_type_id;
    this._room_number = room_number;
    this._availability_status = availability_status;
    this._current_price = current_price;
    this._floor_number = floor_number;
    this._notes = notes;
    this._isActive = isActive;
  }
}
