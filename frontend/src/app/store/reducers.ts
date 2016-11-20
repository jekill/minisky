import {combineReducers, Reducer, Action} from "redux";
import {IAppState} from "./state";
import {Languages} from "../translate/languages";
import {AuthActions} from "./actions/auth.actions";
import {ActionPayload} from "./actions/action-payload";
import {User} from "../model/user";
import {wordsTestReducers} from "./reducers/words-test.reducers";

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


const authToken = (state: string = null, action: ActionPayload) => {
    switch (action.type) {
        case AuthActions.AUTH_UPDATE_TOKEN:
            return action.payload;
    }

    return state;
};

const user = (state: User = null, action: ActionPayload) => {
    switch (action.type) {
        case AuthActions.AUTH_UPDATE_USER:
            return action.payload;
    }

    return state;
};


const currentTest = wordsTestReducers;


const reducers = {
    uiLang,
    isAuthenticated,
    authToken,
    user,
    currentTest
};

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>(reducers);