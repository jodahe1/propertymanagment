import { Entity } from "@shared/shared-kernel";

export class Staff extends Entity {

    private _hotelId: string;

    get hotelId() { return this._hotelId }



    private _userId: string;

    get userId() { return this._userId }



    private _position: string;

    get position() { return this._position }



    private _employmentStatus: string;

    get employmentStatus() { return this._employmentStatus }



    private _hireDate: Date;

    get hireDate() { return this._hireDate }



    private _salary?: number;

    get salary() { return this._salary }



    private _contactNumber?: string;

    get contactNumber() { return this._contactNumber }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        hotelId: string,
        userId: string,
        position: string,
        employmentStatus: string,
        hireDate: Date,
        salary?: number,
        contactNumber?: string,
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
        this._userId = userId;
        this._position = position;
        this._employmentStatus = employmentStatus;
        this._hireDate = hireDate;
        this._salary = salary;
        this._contactNumber = contactNumber;
        this._isActive = isActive;
    }

    public update(
        hotelId: string,
        userId: string,
        position: string,
        employmentStatus: string,
        hireDate: Date,
        salary?: number,
        contactNumber?: string,
        isActive?: boolean,
    ) {
        this._hotelId = hotelId;
                this._userId = userId;
                this._position = position;
                this._employmentStatus = employmentStatus;
                this._hireDate = hireDate;
                this._salary = salary;
                this._contactNumber = contactNumber;
                
                this._isActive = isActive;
    }


}
