import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers/index';

const middleware = [];

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(...middleware)));

export {
    store as default,
};

