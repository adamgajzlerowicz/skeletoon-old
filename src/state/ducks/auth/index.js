// @flow

import { createFormAction } from 'redux-form-saga';


import { takeEvery, put, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import axios from 'axios';

type FormType = {
    username?: string,
    password?: string
};

type UserType = {
    name: string,
    email: string
};

type SuccessResponseType = {
    data: {
        token: string,
        user: UserType
    }
};

const loginAction = createFormAction('LOGIN');

function* loginSaga(): Generator<*, *, *> {
    yield takeEvery(loginAction.REQUEST, handleLoginSaga);
}

function* handleLoginSaga(action: {payload: FormType}): Generator<*, *, *> {
    const { username, password } = action.payload;

    try {
        const result: SuccessResponseType = yield call(axios.post, '/rest/auth/login', { username, password });
        const { data: { token, user } } = result;

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));

        yield put(loginAction.success());
    } catch (e) {
        const formError = new SubmissionError({
            _error: (e.response && e.response.data && e.response.data.error) ? e.response.data.error : 'Server error',
        });

        yield put(loginAction.failure(formError));
    }
}

export {
    loginAction, loginSaga,
};

