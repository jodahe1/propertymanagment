import { Entity } from "@shared/shared-kernel";

export class Hotelpolicy extends Entity {

    private _hotelId: string;

    get hotelId() { return this._hotelId }



    private _policyType: string;

    get policyType() { return this._policyType }



    private _description: string;

    get description() { return this._description }



    private _effectiveDate?: Date;

    get effectiveDate() { return this._effectiveDate }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        hotelId: string,
        policyType: string,
        description: string,
        effectiveDate?: Date,
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
        this._policyType = policyType;
        this._description = description;
        this._effectiveDate = effectiveDate;
        this._isActive = isActive;
    }

    public update(
        hotelId: string,
        policyType: string,
        description: string,
        effectiveDate?: Date,
        isActive?: boolean,
    ) {
        this._hotelId = hotelId;
                this._policyType = policyType;
                this._description = description;
                this._effectiveDate = effectiveDate;
                
                this._isActive = isActive;
    }


}
