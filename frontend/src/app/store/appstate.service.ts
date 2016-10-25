import {NgRedux} from "ng2-redux";
import {IAppState} from "./state";
import {Injectable} from "@angular/core";
import {rootReducer} from "./reducers";
import {Languages} from "../translate/languages";

@Injectable()
export class AppStateService {
    constructor(public store: NgRedux<IAppState>) {
    }

    configure() {
        this.store.configureStore(rootReducer, {uiLang: Languages.ru, isAuthenticated: false});
    }
}