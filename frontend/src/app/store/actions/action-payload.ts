import {Action} from "redux";

export interface ActionPayload extends Action {
    payload: any;
}