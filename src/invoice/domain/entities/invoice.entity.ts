import { Entity } from "@shared/shared-kernel";

export class Invoice extends Entity {

    private _hotelId: string;

    get hotelId() { return this._hotelId }



    private _bookingId: string;

    get bookingId() { return this._bookingId }



    private _invoiceNumber: string;

    get invoiceNumber() { return this._invoiceNumber }



    private _amountDue: number;

    get amountDue() { return this._amountDue }



    private _taxes?: string;

    get taxes() { return this._taxes }



    private _issuedAt: Date;

    get issuedAt() { return this._issuedAt }



    private _dueDate: Date;

    get dueDate() { return this._dueDate }



    private _status: string;

    get status() { return this._status }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        hotelId: string,
        bookingId: string,
        invoiceNumber: string,
        amountDue: number,
        taxes?: string,
        issuedAt: Date,
        dueDate: Date,
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
        this._bookingId = bookingId;
        this._invoiceNumber = invoiceNumber;
        this._amountDue = amountDue;
        this._taxes = taxes;
        this._issuedAt = issuedAt;
        this._dueDate = dueDate;
        this._status = status;
        this._isActive = isActive;
    }

    public update(
        hotelId: string,
        bookingId: string,
        invoiceNumber: string,
        amountDue: number,
        taxes?: string,
        issuedAt: Date,
        dueDate: Date,
        status: string,
        isActive?: boolean,
    ) {
        this._hotelId = hotelId;
                this._bookingId = bookingId;
                this._invoiceNumber = invoiceNumber;
                this._amountDue = amountDue;
                this._taxes = taxes;
                this._issuedAt = issuedAt;
                this._dueDate = dueDate;
                this._status = status;
                
                this._isActive = isActive;
    }


}
