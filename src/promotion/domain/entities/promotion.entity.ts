import { Entity } from "@shared/shared-kernel";

export class Promotion extends Entity {

    private _hotelId: string;

    get hotelId() { return this._hotelId }



    private _code: string;

    get code() { return this._code }



    private _discountType: string;

    get discountType() { return this._discountType }



    private _value: number;

    get value() { return this._value }



    private _validFrom: Date;

    get validFrom() { return this._validFrom }



    private _validTo: Date;

    get validTo() { return this._validTo }



    private _minStay?: number;

    get minStay() { return this._minStay }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        hotelId: string,
        code: string,
        discountType: string,
        value: number,
        validFrom: Date,
        validTo: Date,
        minStay?: number,
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
        this._code = code;
        this._discountType = discountType;
        this._value = value;
        this._validFrom = validFrom;
        this._validTo = validTo;
        this._minStay = minStay;
        this._isActive = isActive;
    }

    public update(
        hotelId: string,
        code: string,
        discountType: string,
        value: number,
        validFrom: Date,
        validTo: Date,
        minStay?: number,
        isActive?: boolean,
    ) {
        this._hotelId = hotelId;
                this._code = code;
                this._discountType = discountType;
                this._value = value;
                this._validFrom = validFrom;
                this._validTo = validTo;
                this._minStay = minStay;
                
                this._isActive = isActive;
    }


}
