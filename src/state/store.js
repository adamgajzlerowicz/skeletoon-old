// @flow

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import persistState from 'redux-localstorage';

import { reducer as formReducer } from 'redux-form';

import rootSaga from './sagas';

import { firewallMiddleware } from './middleware/auth';
import { reducer as auth } from './ducks/auth';

import type { ActionType, StateType } from './type';

const sagaMiddleware = createSagaMiddleware();

const history = createHistory();

const routerReduxMiddleware = routerMiddleware(history);


const StorePersist = persistState(['auth']);

// const foo = <T>(state: T, action: ActionType): T => state;
const foo = (state: {} = {}, action: ActionType): {} => state;


const enchancers = [];
if (process.env.NODE_ENV !== 'test') {
    enchancers.push(StorePersist);
}
enchancers.push(applyMiddleware(firewallMiddleware, sagaMiddleware, routerReduxMiddleware));

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({ router: routerReducer, form: formReducer, foo, auth }),
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

