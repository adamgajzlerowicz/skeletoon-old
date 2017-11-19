// @flow

import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

import type { ActionType } from '../type';

// const foo = <T: {}>(state: T = {}, action: ActionType): T => state;

const foo = (state: {}, action: ActionType): {} => state;

const rootReducer = combineReducers({
    foo,
    form: formReducer,
});


export {
    rootReducer as default,
};

