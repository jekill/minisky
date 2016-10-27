import {combineReducers, Reducer} from "redux";
import {IAppState} from "./state";
import {Languages} from "../translate/languages";

const uiLang = (state: Languages = Languages.en, action: any) => {
    switch (action.type) {
        case 'CHANGE_UI_LANGUAGE':
            return action.newLang;
    }
    return state;
};


const isAuthenticated = () => false;
export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({uiLang, isAuthenticated});