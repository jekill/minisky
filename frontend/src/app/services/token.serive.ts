import {Injectable} from "@angular/core";
import {AppStateService} from "../store/appstate.service";

@Injectable()
export class TokenService {
    private token: string;

    constructor(appState: AppStateService) {
        appState.store.select('authToken').subscribe((val: string) => {
            this.token = val;
        });
    }


    public getToken() {
        return this.token;
    }


}