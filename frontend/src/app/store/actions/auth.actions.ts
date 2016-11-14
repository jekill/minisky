import {ActionPayload} from "./action-payload";
import {Action} from "redux";
import {User} from "../../model/user";

export class AuthActions {
    public static readonly AUTH_SET_AUTHENTICATED = "AUTH_SET_AUTHENTICATED";
    public static readonly AUTH_SET_NOT_AUTHENTICATED = "AUTH_SET_NOT_AUTHENTICATED";
    public static readonly AUTH_UPDATE_TOKEN = "AUTH_UPDATE_TOKEN";
    public static readonly AUTH_UPDATE_USER = "AUTH_UPDATE_USER";

    static createUpdateToken(token: string): ActionPayload {
        return {
            type: this.AUTH_UPDATE_TOKEN,
            payload: token
        };
    }

    static createUpdateIsAuthenticated(val: boolean): Action {
        return {
            type: val ? this.AUTH_SET_AUTHENTICATED : this.AUTH_SET_NOT_AUTHENTICATED
        };
    }

    static createUpdateUser(user?: User): ActionPayload {
        return {
            type: this.AUTH_UPDATE_USER,
            payload: user
        };
    }
}