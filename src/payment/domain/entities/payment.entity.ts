import { Entity } from "@shared/shared-kernel";

export class Payment extends Entity {

    private _bookingId: string;

    get bookingId() { return this._bookingId }



    private _amount: number;

    get amount() { return this._amount }



    private _currency: string;

    get currency() { return this._currency }



    private _paymentMethod: string;

    get paymentMethod() { return this._paymentMethod }



    private _status: string;

    get status() { return this._status }



    private _transactionReference?: string;

    get transactionReference() { return this._transactionReference }



    private _paidAt: Date;

    get paidAt() { return this._paidAt }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        bookingId: string,
        amount: number,
        currency: string,
        paymentMethod: string,
        status: string,
        transactionReference?: string,
        paidAt: Date,
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
        this._bookingId = bookingId;
        this._amount = amount;
        this._currency = currency;
        this._paymentMethod = paymentMethod;
        this._status = status;
        this._transactionReference = transactionReference;
        this._paidAt = paidAt;
        this._isActive = isActive;
    }

    public update(
        bookingId: string,
        amount: number,
        currency: string,
        paymentMethod: string,
        status: string,
        transactionReference?: string,
        paidAt: Date,
        isActive?: boolean,
    ) {
        this._bookingId = bookingId;
                this._amount = amount;
                this._currency = currency;
                this._paymentMethod = paymentMethod;
                this._status = status;
                this._transactionReference = transactionReference;
                this._paidAt = paidAt;
                
                this._isActive = isActive;
    }


}
