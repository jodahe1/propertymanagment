import { Entity } from "@shared/shared-kernel";

export class Roomtype extends Entity {

    private _hotelId: string;

    get hotelId() { return this._hotelId }



    private _name: string;

    get name() { return this._name }



    private _description?: string;

    get description() { return this._description }



    private _maxGuests: number;

    get maxGuests() { return this._maxGuests }



    private _bedType: string;

    get bedType() { return this._bedType }



    private _amenities?: string[];

    get amenities() { return this._amenities }



    private _basePrice: number;

    get basePrice() { return this._basePrice }



    private _sizeSqft?: number;

    get sizeSqft() { return this._sizeSqft }



    private _images?: string[];

    get images() { return this._images }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        hotelId: string,
        name: string,
        description?: string,
        maxGuests: number,
        bedType: string,
        amenities?: string[],
        basePrice: number,
        sizeSqft?: number,
        images?: string[],
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
        this._maxGuests = maxGuests;
        this._bedType = bedType;
        this._amenities = amenities;
        this._basePrice = basePrice;
        this._sizeSqft = sizeSqft;
        this._images = images;
        this._isActive = isActive;
    }

    public update(
        hotelId: string,
        name: string,
        description?: string,
        maxGuests: number,
        bedType: string,
        amenities?: string[],
        basePrice: number,
        sizeSqft?: number,
        images?: string[],
        isActive?: boolean,
    ) {
        this._hotelId = hotelId;
                this._name = name;
                this._description = description;
                this._maxGuests = maxGuests;
                this._bedType = bedType;
                this._amenities = amenities;
                this._basePrice = basePrice;
                this._sizeSqft = sizeSqft;
                this._images = images;
                
                this._isActive = isActive;
    }


}
