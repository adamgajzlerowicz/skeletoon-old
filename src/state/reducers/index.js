// @flow

import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

type ActionType = {
    type: string,
    payload?: {}
};

const foo = <T>(state: T = {}, action: ActionType): T => state;

const rootReducer = combineReducers({
    foo,
    form: formReducer,
});


export {
    rootReducer as default,
};

