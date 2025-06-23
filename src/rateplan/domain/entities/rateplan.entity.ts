import { Entity } from "@shared/shared-kernel";

export class Rateplan extends Entity {

    private _hotelId: string;

    get hotelId() { return this._hotelId }



    private _roomTypeId: string;

    get roomTypeId() { return this._roomTypeId }



    private _name: string;

    get name() { return this._name }



    private _description?: string;

    get description() { return this._description }



    private _basePriceModifier: number;

    get basePriceModifier() { return this._basePriceModifier }



    private _minNights?: number;

    get minNights() { return this._minNights }



    private _maxNights?: number;

    get maxNights() { return this._maxNights }



    private _validFrom?: Date;

    get validFrom() { return this._validFrom }



    private _validTo?: Date;

    get validTo() { return this._validTo }



    private _status: string;

    get status() { return this._status }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        hotelId: string,
        roomTypeId: string,
        name: string,
        description?: string,
        basePriceModifier: number,
        minNights?: number,
        maxNights?: number,
        validFrom?: Date,
        validTo?: Date,
        status: string,
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
        this._roomTypeId = roomTypeId;
        this._name = name;
        this._description = description;
        this._basePriceModifier = basePriceModifier;
        this._minNights = minNights;
        this._maxNights = maxNights;
        this._validFrom = validFrom;
        this._validTo = validTo;
        this._status = status;
        this._isActive = isActive;
    }

    public update(
        hotelId: string,
        roomTypeId: string,
        name: string,
        description?: string,
        basePriceModifier: number,
        minNights?: number,
        maxNights?: number,
        validFrom?: Date,
        validTo?: Date,
        status: string,
        isActive?: boolean,
    ) {
        this._hotelId = hotelId;
                this._roomTypeId = roomTypeId;
                this._name = name;
                this._description = description;
                this._basePriceModifier = basePriceModifier;
                this._minNights = minNights;
                this._maxNights = maxNights;
                this._validFrom = validFrom;
                this._validTo = validTo;
                this._status = status;
                
                this._isActive = isActive;
    }


}
