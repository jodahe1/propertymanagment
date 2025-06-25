import { Entity } from '@shared/shared-kernel';
import { AvailabilityStatus } from '../valueObjects';
import { Hotel } from 'src/hotel/domain/entities';
import { RoomType } from 'src/roomType/domain/entities';
export class Room extends Entity {
  private _hotel_id: string;
  get hotel_id() {
    return this._hotel_id;
  }

  private _hotel: Hotel; // This represents the Many-to-One relationship to Hotel
  get hotel(): Hotel {
    return this._hotel;
  }

  private _room_type_id: string;
  get room_type_id() {
    return this._room_type_id;
  }

  private _roomType: RoomType; // This represents the Many-to-One relationship to RoomType
  get roomType(): RoomType {
    return this._roomType;
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
    hotel: Hotel, // Added Hotel object to constructor
    room_type_id: string,
    roomType: RoomType, // Added RoomType object to constructor
    room_number: string,
    availability_status: AvailabilityStatus,
    current_price: number,
    floor_number?: number,
    notes?: string,
    // Base class properties
    id?: string,
    isActive: boolean = true,
    createdAt?: Date,
    updatedAt?: Date,
    createdBy?: string,
    updatedBy?: string,
  ) {
    super(id, createdAt, updatedAt, createdBy, updatedBy);
    this._hotel_id = hotel_id;
    this._hotel = hotel; // Assign the hotel object
    this._room_type_id = room_type_id;
    this._roomType = roomType; // Assign the roomType object
    this._room_number = room_number;
    this._floor_number = floor_number;
    this._availability_status = availability_status;
    this._current_price = current_price;
    this._notes = notes;
    this._isActive = isActive;
  }

  public update(
    hotel_id: string,
    hotel: Hotel, // Added Hotel object to update method
    room_type_id: string,
    roomType: RoomType, // Added RoomType object to update method
    room_number: string,
    availability_status: AvailabilityStatus,
    current_price: number,
    floor_number?: number,
    notes?: string,
    isActive?: boolean,
  ) {
    this._hotel_id = hotel_id;
    this._hotel = hotel;
    this._room_type_id = room_type_id;
    this._roomType = roomType;
    this._room_number = room_number;
    this._floor_number = floor_number;
    this._availability_status = availability_status;
    this._current_price = current_price;
    this._notes = notes;
    if (isActive !== undefined) this._isActive = isActive;
  }
}
