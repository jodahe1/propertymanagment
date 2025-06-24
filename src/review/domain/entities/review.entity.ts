import { Entity } from "@shared/shared-kernel";

export class Review extends Entity {

    private _hotelId: string;

    get hotelId() { return this._hotelId }



    private _guestId: string;

    get guestId() { return this._guestId }



    private _rating: number;

    get rating() { return this._rating }



    private _comment?: string;

    get comment() { return this._comment }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        hotelId: string,
        guestId: string,
        rating: number,
        comment?: string,
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
        this._rating = rating;
        this._comment = comment;
        this._isActive = isActive;
    }

    public update(
        hotelId: string,
        guestId: string,
        rating: number,
        comment?: string,
        isActive?: boolean,
    ) {
        this._hotelId = hotelId;
                this._guestId = guestId;
                this._rating = rating;
                this._comment = comment;
                
                this._isActive = isActive;
    }


}
