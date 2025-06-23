import { Entity } from "@shared/shared-kernel";

export class Room extends Entity {

    private _roomTypeId: string;

    get roomTypeId() { return this._roomTypeId }



    private _roomNumber: string;

    get roomNumber() { return this._roomNumber }



    private _floor: number;

    get floor() { return this._floor }



    private _status: string;

    get status() { return this._status }



    private _lastCleanedAt?: Date;

    get lastCleanedAt() { return this._lastCleanedAt }



    private _notes?: string;

    get notes() { return this._notes }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        roomTypeId: string,
        roomNumber: string,
        floor: number,
        status: string,
        lastCleanedAt?: Date,
        notes?: string,
        //base class properties,
        id?: string,
        isActive?: boolean,
        createdAt?: Date,
        updatedAt?: Date,
        createdBy?: string,
        updatedBy?: string,
    ) {
        super(
            id,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
        );
        this._roomTypeId = roomTypeId;
        this._roomNumber = roomNumber;
        this._floor = floor;
        this._status = status;
        this._lastCleanedAt = lastCleanedAt;
        this._notes = notes;
        this._isActive = isActive;
    }

    public update(
        roomTypeId: string,
        roomNumber: string,
        floor: number,
        status: string,
        lastCleanedAt?: Date,
        notes?: string,
        isActive?: boolean,
    ) {
        this._roomTypeId = roomTypeId;
                this._roomNumber = roomNumber;
                this._floor = floor;
                this._status = status;
                this._lastCleanedAt = lastCleanedAt;
                this._notes = notes;
                
                this._isActive = isActive;
    }


}
