import { Entity } from "@shared/shared-kernel";

export class Booking extends Entity {

    private _hotelId: string;

    get hotelId() { return this._hotelId }



    private _guestId: string;

    get guestId() { return this._guestId }



    private _roomId: string;

    get roomId() { return this._roomId }



    private _checkInDate: Date;

    get checkInDate() { return this._checkInDate }



    private _checkOutDate: Date;

    get checkOutDate() { return this._checkOutDate }



    private _numGuests: number;

    get numGuests() { return this._numGuests }



    private _totalPrice: number;

    get totalPrice() { return this._totalPrice }



    private _currency: string;

    get currency() { return this._currency }



    private _status: string;

    get status() { return this._status }



    private _notes?: string;

    get notes() { return this._notes }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        hotelId: string,
        guestId: string,
        roomId: string,
        checkInDate: Date,
        checkOutDate: Date,
        numGuests: number,
        totalPrice: number,
        currency: string,
        status: string,
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
        this._hotelId = hotelId;
        this._guestId = guestId;
        this._roomId = roomId;
        this._checkInDate = checkInDate;
        this._checkOutDate = checkOutDate;
        this._numGuests = numGuests;
        this._totalPrice = totalPrice;
        this._currency = currency;
        this._status = status;
        this._notes = notes;
        this._isActive = isActive;
    }

    public update(
        hotelId: string,
        guestId: string,
        roomId: string,
        checkInDate: Date,
        checkOutDate: Date,
        numGuests: number,
        totalPrice: number,
        currency: string,
        status: string,
        notes?: string,
        isActive?: boolean,
    ) {
        this._hotelId = hotelId;
                this._guestId = guestId;
                this._roomId = roomId;
                this._checkInDate = checkInDate;
                this._checkOutDate = checkOutDate;
                this._numGuests = numGuests;
                this._totalPrice = totalPrice;
                this._currency = currency;
                this._status = status;
                this._notes = notes;
                
                this._isActive = isActive;
    }


}
