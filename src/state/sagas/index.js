// @flow

import { all } from 'redux-saga/effects';
import formActionSaga from 'redux-form-saga';

// import { saga as loginSaga } from '../ducks/auth';

export default function* rootSaga(): Generator<*, *, *> {
    yield all([
        formActionSaga(),
        // loginSaga(),
    ]);
}
