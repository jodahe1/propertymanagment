import { Entity } from '@shared/shared-kernel';
import { BlockedReason } from '../valueObjects/blocked-reason.enum';

export class Roomtypeavailabilities extends Entity {
  private _roomTypeId: string;
  get roomTypeId() {
    return this._roomTypeId;
  }

  private _date: string;
  get date() {
    return this._date;
  }

  private _availableQuantity: number;
  get availableQuantity() {
    return this._availableQuantity;
  }

  private _priceModifier?: number;
  get priceModifier() {
    return this._priceModifier;
  }

  private _minStayNights?: number;
  get minStayNights() {
    return this._minStayNights;
  }

  private _maxStayNights?: number;
  get maxStayNights() {
    return this._maxStayNights;
  }

  private _blockedReason?: BlockedReason; // CHANGED TYPE TO BlockedReason
  get blockedReason() {
    return this._blockedReason;
  }

  private _isActive: boolean;
  get isActive() {
    return this._isActive;
  }

  constructor(
    roomTypeId: string,
    date: string,
    availableQuantity: number,
    priceModifier?: number,
    minStayNights?: number,
    maxStayNights?: number,
    blockedReason?: BlockedReason,
    //base class properties,
    id?: string,
    isActive?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    createdBy?: string,
    updatedBy?: string,
  ) {
    super(id, createdAt, updatedAt, createdBy, updatedBy);
    this._roomTypeId = roomTypeId;
    this._date = date;
    this._availableQuantity = availableQuantity;
    this._priceModifier = priceModifier;
    this._minStayNights = minStayNights;
    this._maxStayNights = maxStayNights;
    this._blockedReason = blockedReason;
    this._isActive = isActive;
  }

  public update(
    roomTypeId: string,
    date: string,
    availableQuantity: number,
    priceModifier?: number,
    minStayNights?: number,
    maxStayNights?: number,
    blockedReason?: BlockedReason,
    isActive?: boolean,
  ) {
    this._roomTypeId = roomTypeId;
    this._date = date;
    this._availableQuantity = availableQuantity;
    this._priceModifier = priceModifier;
    this._minStayNights = minStayNights;
    this._maxStayNights = maxStayNights;
    this._blockedReason = blockedReason;

    this._isActive = isActive;
  }
}
