import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class AuthService {

    private _isAuthenticated: boolean = false;

    constructor(private http: Http,
                private storage: WindowLocalStorage) {
    }

    public isAuthenticated() {
        return this._isAuthenticated;
    }

}
