// @flow

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { reducer as formReducer } from 'redux-form';

import type { ActionType } from './type';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();


const history = createHistory();

const routerReduxMiddleware = routerMiddleware(history);

// const foo = <T>(state: T, action: ActionType): T => state;
const foo = (state: {} = {}, action: ActionType): {} => state;

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({ router: routerReducer, form: formReducer, foo }),
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware, routerReduxMiddleware)),
);

sagaMiddleware.run(rootSaga);

export {
    store as default, history,
};

