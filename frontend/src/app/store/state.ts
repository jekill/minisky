import {Languages} from "../translate/languages";

export interface IAppState {
    uiLang?: Languages;
    isAuthenticated: boolean;
}