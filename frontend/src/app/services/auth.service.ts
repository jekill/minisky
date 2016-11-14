import {Injectable} from '@angular/core';
import {AppStateService} from "../store/appstate.service";
import {JwtHelper} from "angular2-jwt";
import {Http} from "@angular/http";
import {User} from "../model/user";
import {AuthActions} from "../store/actions/auth.actions";


@Injectable()
export class AuthService {

    private _isAuthenticated: boolean = false;
    /**
     * jwt token
     */
    private token: string;
    private jwtHelper = new JwtHelper();
    private currentUser: User;

    constructor(private appState: AppStateService, private http: Http) {
        appState.store.select('isAuthenticated').subscribe((val: boolean) => {
            this._isAuthenticated = val;
        });

        appState.store.select('authToken').subscribe((val: string) => {
            this.token = val;
        });

        appState.store.select('user').subscribe((val: User) => {
            this.currentUser = val;
        });

    }

    public authenticate(username) {
        this.http
            .post("/api/token", {username})
            .toPromise()
            .then((res) => {
                const data = res.json();
                if (!this.jwtHelper.isTokenExpired(data.token)) {
                    this.saveToken(data.token);
                    this.updateAuthenticated(true);
                    this.updateUser({username, id: ''});
                } else {
                    this.clearAuthenticated();
                }
            })
            .catch((err) => {
                console.log("ERR:", err);
            });
    }

    public isAuthenticated() {

        return this._isAuthenticated;
    }

    private saveToken(token?: string) {
        this.appState.store.dispatch(AuthActions.createUpdateToken(token));
    }

    private updateAuthenticated(val: boolean) {
        this.appState.store.dispatch(AuthActions.createUpdateIsAuthenticated(val));
    }

    private clearAuthenticated() {
        this.saveToken(null);
        this.updateAuthenticated(false);
        // this.appState.store.dispatch(AuthActions.createClearAuthenticated());
    }

    private updateUser(user: User) {
        this.appState.store.dispatch(AuthActions.createUpdateUser(user));
    }
}
