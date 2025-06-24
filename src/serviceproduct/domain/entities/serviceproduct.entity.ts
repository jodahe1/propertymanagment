import { Entity } from "@shared/shared-kernel";

export class Serviceproduct extends Entity {

    private _hotelId: string;

    get hotelId() { return this._hotelId }



    private _name: string;

    get name() { return this._name }



    private _description?: string;

    get description() { return this._description }



    private _price: number;

    get price() { return this._price }



    private _currency: string;

    get currency() { return this._currency }



    private _status: string;

    get status() { return this._status }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        hotelId: string,
        name: string,
        description?: string,
        price: number,
        currency: string,
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
        this._name = name;
        this._description = description;
        this._price = price;
        this._currency = currency;
        this._status = status;
        this._isActive = isActive;
    }

    public update(
        hotelId: string,
        name: string,
        description?: string,
        price: number,
        currency: string,
        status: string,
        isActive?: boolean,
    ) {
        this._hotelId = hotelId;
                this._name = name;
                this._description = description;
                this._price = price;
                this._currency = currency;
                this._status = status;
                
                this._isActive = isActive;
    }


}
