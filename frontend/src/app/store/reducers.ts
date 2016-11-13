import {combineReducers, Reducer, Action} from "redux";
import {IAppState} from "./state";
import {Languages} from "../translate/languages";
import {AuthActions} from "./actions/auth.actions";

const uiLang = (state: Languages = Languages.en, action: any) => {
    switch (action.type) {
        case 'CHANGE_UI_LANGUAGE':
            return action.newLang;
    }
    return state;
};


const isAuthenticated = (state: boolean = false, action: Action) => {
    switch (action.type) {
        case AuthActions.AUTH_SET_AUTHENTICATED:
            return true;
        case AuthActions.AUTH_SET_NOT_AUTHENTICATED:
            return false;
    }

    return state;
};


export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({uiLang, isAuthenticated});