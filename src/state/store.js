// @todo please document - check api/phClient correct location
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';


export default function makeStore({ client, enableApi } = {}) {
    // const middlewares = [sagaMiddleware];

    const store = createStore(rootReducer, undefined, compose(
        applyMiddleware(...middlewares),
        process.env && window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));

    // sagaMiddleware.run(rootSaga);

    return store;
}
