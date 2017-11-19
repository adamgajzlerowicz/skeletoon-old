import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { reducer as formReducer } from 'redux-form';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();


const history = createHistory();

const routerReduxMiddleware = routerMiddleware(history);


// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({ ...rootReducer, router: routerReducer, form: formReducer }),
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware, routerReduxMiddleware)),
);

sagaMiddleware.run(rootSaga);

export {
    store as default, history,
};

