// @flow

import { createFormAction } from 'redux-form-saga';


import { takeEvery, put, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import axios from 'axios';

const LOGIN: string = 'LOGIN';
const REGISTER: string = 'REGISTER';
const LOGOUT: string = 'LOGOUT';

type LoginFormType = {
    username?: string,
    password?: string
};

type UserType = {
    name: string,
    email: string
};

type SuccessLoginResponseType = {
    data: {
        token: string,
        user: UserType
    }
};

const loginAction = createFormAction(LOGIN);

const registerAction = createFormAction(REGISTER);

const logoutAction = createFormAction(LOGOUT);

// eslint-disable-next-line
function* setStorageDetails({ user, token }: {user?: UserType, token?: string}): Generator<*, *, *> {
    if (user && token) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
    } else {
        sessionStorage.clear();
    }

    yield true;
}

function* handleLoginSaga(action: {payload: LoginFormType}): Generator<*, *, *> {
    const { username, password } = action.payload;

    try {
        const result: SuccessLoginResponseType = yield call(axios.post, '/rest/auth/login', { username, password });
        const { data: { token, user } } = result;
        yield call(setStorageDetails, { token, user });
        yield put(loginAction.success());
    } catch (e) {
        const formError = new SubmissionError({
            _error: (e.response && e.response.data && e.response.data.error) ? e.response.data.error : 'Server error',
        });

        yield put(loginAction.failure(formError));
    }
}

function* handleRegisterSaga(action: {payload: LoginFormType}): Generator<*, *, *> {
    const { username, password } = action.payload;

    try {
        const result: SuccessLoginResponseType = yield call(axios.post, '/rest/auth/login', { username, password });
        const { data: { token, user } } = result;
        yield call(setStorageDetails, { token, user });
        yield put(loginAction.success());
    } catch (e) {
        const formError = new SubmissionError({
            _error: (e.response && e.response.data && e.response.data.error) ? e.response.data.error : 'Server error',
        });

        yield put(loginAction.failure(formError));
    }
}

function* handleLogoutSaga(): Generator<*, *, *> {
    yield setStorageDetails({ name: null, email: null });
}

function* loginSaga(): Generator<*, *, *> {
    yield takeEvery(loginAction.REQUEST, handleLoginSaga);
    yield takeEvery(registerAction.REQUEST, handleRegisterSaga);
    yield takeEvery(logoutAction.REQUEST, handleLogoutSaga);
}

export {
    loginAction, loginSaga,
};

