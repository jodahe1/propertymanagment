import { Entity } from "@shared/shared-kernel";

export class User extends Entity {

    private _fullName: string;

    get fullName() { return this._fullName }



    private _email: string;

    get email() { return this._email }



    private _phoneNumber?: string;

    get phoneNumber() { return this._phoneNumber }



    private _password: string;

    get password() { return this._password }



    private _role: string;

    get role() { return this._role }



    private _isVerified?: boolean;

    get isVerified() { return this._isVerified }



    private _profilePicture?: string;

    get profilePicture() { return this._profilePicture }



    private _lastLoginAt?: Date;

    get lastLoginAt() { return this._lastLoginAt }



    private _isActive: boolean;

    get isActive() { return this._isActive }



    constructor(
        fullName: string,
        email: string,
        phoneNumber?: string,
        password: string,
        role: string,
        isVerified?: boolean,
        profilePicture?: string,
        lastLoginAt?: Date,
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
        this._password = password;
        this._role = role;
        this._isVerified = isVerified;
        this._profilePicture = profilePicture;
        this._lastLoginAt = lastLoginAt;
        this._isActive = isActive;
    }

    public update(
        fullName: string,
        email: string,
        phoneNumber?: string,
        password: string,
        role: string,
        isVerified?: boolean,
        profilePicture?: string,
        lastLoginAt?: Date,
        isActive?: boolean,
    ) {
        this._fullName = fullName;
                this._email = email;
                this._phoneNumber = phoneNumber;
                this._password = password;
                this._role = role;
                this._isVerified = isVerified;
                this._profilePicture = profilePicture;
                this._lastLoginAt = lastLoginAt;
                
                this._isActive = isActive;
    }


}
