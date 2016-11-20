import {combineReducers} from "redux";
import {TestActions} from "../actions/test.actions";
import {WordsTest} from "../../model/WordsTest";
import {ActionPayload} from "../actions/action-payload";

const wordsTest = (state: WordsTest = null, action: ActionPayload) => {
    switch (action.type) {
        case TestActions.TEST_SET_CURRENT_TEST_ACTION:
            return action.payload;
    }

    return state;
};

const reducers = {
    wordsTest
};

export const wordsTestReducers = combineReducers(reducers);