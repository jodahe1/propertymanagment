import { Entity } from "@shared/shared-kernel";

export class Expense extends Entity {

    private _hotelId: string;

    get hotelId() { return this._hotelId }



    private _category: string;

    get category() { return this._category }



    private _amount: number;

    get amount() { return this._amount }



    private _currency: string;

    get currency() { return this._currency }



    private _description?: string;

    get description() { return this._description }



    private _expenseDate: Date;

    get expenseDate() { return this._expenseDate }



    private _receiptUrl?: string;

    get receiptUrl() { return this._receiptUrl }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        hotelId: string,
        category: string,
        amount: number,
        currency: string,
        description?: string,
        expenseDate: Date,
        receiptUrl?: string,
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
        this._category = category;
        this._amount = amount;
        this._currency = currency;
        this._description = description;
        this._expenseDate = expenseDate;
        this._receiptUrl = receiptUrl;
        this._isActive = isActive;
    }

    public update(
        hotelId: string,
        category: string,
        amount: number,
        currency: string,
        description?: string,
        expenseDate: Date,
        receiptUrl?: string,
        isActive?: boolean,
    ) {
        this._hotelId = hotelId;
                this._category = category;
                this._amount = amount;
                this._currency = currency;
                this._description = description;
                this._expenseDate = expenseDate;
                this._receiptUrl = receiptUrl;
                
                this._isActive = isActive;
    }


}
