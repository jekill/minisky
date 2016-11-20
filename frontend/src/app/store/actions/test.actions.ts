import {ActionPayload} from "./action-payload";
import {WordsTest} from "../../model/WordsTest";

export class TestActions {
    public static readonly TEST_SET_CURRENT_TEST_ACTION = "TEST_SET_CURRENT_ACTION";

    public static createSetCurrentAction(test: WordsTest): ActionPayload {
        return {
            type: this.TEST_SET_CURRENT_TEST_ACTION,
            payload: test
        };
    }
}