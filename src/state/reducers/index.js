// @flow

import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

type ActionType = {
    type: string,
    payload?: {} | string
};


// const foo = <T: {}>(state: T = {}, action: ActionType): T => state;

const foo = (state: {} = {}, action: ActionType): {} => state;

const rootReducer = combineReducers({
    foo,
    form: formReducer,
});


export {
    rootReducer as default,
};

