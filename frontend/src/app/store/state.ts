import {Languages} from "../translate/languages";
import {User} from "../model/user";
import {Score} from "../model/score";

export interface IAppState {
    uiLang?: Languages;
    isAuthenticated: boolean;
    authToken?: string;
    user?: User;
    score?: Score;
}