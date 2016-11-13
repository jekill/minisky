import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {AppStateService} from "../store/appstate.service";

@Injectable()
export class AuthService {

    private _isAuthenticated: boolean = false;

    constructor(private http: Http, private appState: AppStateService) {
        appState.store.select('isAuthenticated').subscribe((val: boolean) => {
            this._isAuthenticated = val;
        });
    }

    public isAuthenticated() {
        return this._isAuthenticated;
    }


}
