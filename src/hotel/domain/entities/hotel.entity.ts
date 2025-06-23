import { Entity } from "@shared/shared-kernel";

export class Hotel extends Entity {

    private _userId: string;

    get userId() { return this._userId }



    private _name: string;

    get name() { return this._name }



    private _description?: string;

    get description() { return this._description }



    private _address: string;

    get address() { return this._address }



    private _city: string;

    get city() { return this._city }



    private _country: string;

    get country() { return this._country }



    private _zipCode?: string;

    get zipCode() { return this._zipCode }



    private _latitude?: number;

    get latitude() { return this._latitude }



    private _longitude?: number;

    get longitude() { return this._longitude }



    private _contactEmail: string;

    get contactEmail() { return this._contactEmail }



    private _contactPhone: string;

    get contactPhone() { return this._contactPhone }



    private _starRating?: number;

    get starRating() { return this._starRating }



    private _status: string;

    get status() { return this._status }



    private _timezone?: string;

    get timezone() { return this._timezone }



    private _images?: string[];

    get images() { return this._images }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        userId: string,
        name: string,
        description?: string,
        address: string,
        city: string,
        country: string,
        zipCode?: string,
        latitude?: number,
        longitude?: number,
        contactEmail: string,
        contactPhone: string,
        starRating?: number,
        status: string,
        timezone?: string,
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
        this._userId = userId;
        this._name = name;
        this._description = description;
        this._address = address;
        this._city = city;
        this._country = country;
        this._zipCode = zipCode;
        this._latitude = latitude;
        this._longitude = longitude;
        this._contactEmail = contactEmail;
        this._contactPhone = contactPhone;
        this._starRating = starRating;
        this._status = status;
        this._timezone = timezone;
        this._images = images;
        this._isActive = isActive;
    }

    public update(
        userId: string,
        name: string,
        description?: string,
        address: string,
        city: string,
        country: string,
        zipCode?: string,
        latitude?: number,
        longitude?: number,
        contactEmail: string,
        contactPhone: string,
        starRating?: number,
        status: string,
        timezone?: string,
        images?: string[],
        isActive?: boolean,
    ) {
        this._userId = userId;
                this._name = name;
                this._description = description;
                this._address = address;
                this._city = city;
                this._country = country;
                this._zipCode = zipCode;
                this._latitude = latitude;
                this._longitude = longitude;
                this._contactEmail = contactEmail;
                this._contactPhone = contactPhone;
                this._starRating = starRating;
                this._status = status;
                this._timezone = timezone;
                this._images = images;
                
                this._isActive = isActive;
    }


}
