import {NgRedux} from "ng2-redux";
import {IAppState} from "./state";
import {Injectable} from "@angular/core";
import {rootReducer} from "./reducers";
import {Languages} from "../translate/languages";
import {compose} from "redux";

const persistState = require('redux-localstorage');


@Injectable()
export class AppStateService {
    constructor(public store: NgRedux<IAppState>) {
    }

    configure() {
        this.store.configureStore(
            rootReducer,
            {uiLang: Languages.ru, isAuthenticated: false},
            null,
            this.enchacers()
        );
    }

    private enchacers() {
        const enhancers = compose(
            persistState(/*paths, config*/),
        );

        return enhancers;
    }
}