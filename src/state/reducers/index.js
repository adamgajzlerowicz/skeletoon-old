import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

const foo = (state = {}, action) => state;

const rootReducer = combineReducers({
    foo,
    form: formReducer,
});


export {
    rootReducer as default,
};

