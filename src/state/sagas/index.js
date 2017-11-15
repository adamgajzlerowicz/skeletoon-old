// @flow

import { all } from 'redux-saga/effects';


import { saga as loginSaga } from '../ducks/auth';

export default function* rootSaga(): Generator<*, *, *> {
    yield all([
        loginSaga(),
    ]);
}
