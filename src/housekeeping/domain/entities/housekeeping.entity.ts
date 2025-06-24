import { Entity } from "@shared/shared-kernel";

export class Housekeeping extends Entity {

    private _roomId: string;

    get roomId() { return this._roomId }



    private _staffId: string;

    get staffId() { return this._staffId }



    private _status: string;

    get status() { return this._status }



    private _notes?: string;

    get notes() { return this._notes }



    private _completedAt?: Date;

    get completedAt() { return this._completedAt }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        roomId: string,
        staffId: string,
        status: string,
        notes?: string,
        completedAt?: Date,
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
        this._roomId = roomId;
        this._staffId = staffId;
        this._status = status;
        this._notes = notes;
        this._completedAt = completedAt;
        this._isActive = isActive;
    }

    public update(
        roomId: string,
        staffId: string,
        status: string,
        notes?: string,
        completedAt?: Date,
        isActive?: boolean,
    ) {
        this._roomId = roomId;
                this._staffId = staffId;
                this._status = status;
                this._notes = notes;
                this._completedAt = completedAt;
                
                this._isActive = isActive;
    }


}
