import { Entity } from "@shared/shared-kernel";

export class RoomType extends Entity {

    private _hotel_id: string;

    get hotel_id() { return this._hotel_id }



    private _name: string;

    get name() { return this._name }



    private _description?: string;

    get description() { return this._description }



    private _max_guests: number;

    get max_guests() { return this._max_guests }



    private _max_adults: number;

    get max_adults() { return this._max_adults }



    private _max_children: number;

    get max_children() { return this._max_children }



    private _bed_type: string;

    get bed_type() { return this._bed_type }



    private _amenities?: string[];

    get amenities() { return this._amenities }



    private _base_price: number;

    get base_price() { return this._base_price }



    private _size_sqm?: number;

    get size_sqm() { return this._size_sqm }



    private _quantity: number;

    get quantity() { return this._quantity }



    private _extra_bed_capacity?: number;

    get extra_bed_capacity() { return this._extra_bed_capacity }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        hotel_id: string,
        name: string,
        description?: string,
        max_guests: number,
        max_adults: number,
        max_children: number,
        bed_type: string,
        amenities?: string[],
        base_price: number,
        size_sqm?: number,
        quantity: number,
        extra_bed_capacity?: number,
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
        this._hotel_id = hotel_id;
        this._name = name;
        this._description = description;
        this._max_guests = max_guests;
        this._max_adults = max_adults;
        this._max_children = max_children;
        this._bed_type = bed_type;
        this._amenities = amenities;
        this._base_price = base_price;
        this._size_sqm = size_sqm;
        this._quantity = quantity;
        this._extra_bed_capacity = extra_bed_capacity;
        this._isActive = isActive;
    }

    public update(
        hotel_id: string,
        name: string,
        description?: string,
        max_guests: number,
        max_adults: number,
        max_children: number,
        bed_type: string,
        amenities?: string[],
        base_price: number,
        size_sqm?: number,
        quantity: number,
        extra_bed_capacity?: number,
        isActive?: boolean,
    ) {
        this._hotel_id = hotel_id;
                this._name = name;
                this._description = description;
                this._max_guests = max_guests;
                this._max_adults = max_adults;
                this._max_children = max_children;
                this._bed_type = bed_type;
                this._amenities = amenities;
                this._base_price = base_price;
                this._size_sqm = size_sqm;
                this._quantity = quantity;
                this._extra_bed_capacity = extra_bed_capacity;
                
                this._isActive = isActive;
    }


}
