import { Entity } from "@shared/shared-kernel";

export class Guest extends Entity {

    private _fullName: string;

    get fullName() { return this._fullName }



    private _email: string;

    get email() { return this._email }



    private _phoneNumber?: string;

    get phoneNumber() { return this._phoneNumber }



    private _address?: string;

    get address() { return this._address }



    private _city?: string;

    get city() { return this._city }



    private _country?: string;

    get country() { return this._country }



    private _zipCode?: string;

    get zipCode() { return this._zipCode }



    private _dateOfBirth?: Date;

    get dateOfBirth() { return this._dateOfBirth }



    private _nationality?: string;

    get nationality() { return this._nationality }



    private _idDocumentType: string;

    get idDocumentType() { return this._idDocumentType }



    private _idDocumentNumber: string;

    get idDocumentNumber() { return this._idDocumentNumber }



    private _notes?: string;

    get notes() { return this._notes }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        fullName: string,
        email: string,
        phoneNumber?: string,
        address?: string,
        city?: string,
        country?: string,
        zipCode?: string,
        dateOfBirth?: Date,
        nationality?: string,
        idDocumentType: string,
        idDocumentNumber: string,
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
        this._fullName = fullName;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._address = address;
        this._city = city;
        this._country = country;
        this._zipCode = zipCode;
        this._dateOfBirth = dateOfBirth;
        this._nationality = nationality;
        this._idDocumentType = idDocumentType;
        this._idDocumentNumber = idDocumentNumber;
        this._notes = notes;
        this._isActive = isActive;
    }

    public update(
        fullName: string,
        email: string,
        phoneNumber?: string,
        address?: string,
        city?: string,
        country?: string,
        zipCode?: string,
        dateOfBirth?: Date,
        nationality?: string,
        idDocumentType: string,
        idDocumentNumber: string,
        notes?: string,
        isActive?: boolean,
    ) {
        this._fullName = fullName;
                this._email = email;
                this._phoneNumber = phoneNumber;
                this._address = address;
                this._city = city;
                this._country = country;
                this._zipCode = zipCode;
                this._dateOfBirth = dateOfBirth;
                this._nationality = nationality;
                this._idDocumentType = idDocumentType;
                this._idDocumentNumber = idDocumentNumber;
                this._notes = notes;
                
                this._isActive = isActive;
    }


}
