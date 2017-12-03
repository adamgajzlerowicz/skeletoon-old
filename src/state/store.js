// @flow

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import persistState from 'redux-localstorage';

import { reducer as formReducer } from 'redux-form';

import rootSaga from './sagas';

import { authMiddleware } from './middleware/auth';

import type { ActionType } from './type';

const sagaMiddleware = createSagaMiddleware();

const history = createHistory();

const routerReduxMiddleware = routerMiddleware(history);

type StateType = {
    foo: {},
    form: {},
    router: {}
};


const StorePersist = persistState(['foo', 'auth']);

// const foo = <T>(state: T, action: ActionType): T => state;
const foo = (state: {} = {}, action: ActionType): {} => state;


const enchancers = [];
if (process.env.NODE_ENV !== 'test') {
    enchancers.push(StorePersist);
}
enchancers.push(applyMiddleware(authMiddleware, sagaMiddleware, routerReduxMiddleware));

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({ router: routerReducer, form: formReducer, foo }),
    {},
    // $FlowFixMe
    composeEnhancers(...enchancers),
);

sagaMiddleware.run(rootSaga);

export type {
    StateType,
};

export {
    store as default, history,
};

