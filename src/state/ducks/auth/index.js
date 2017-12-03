// @flow

import { createFormAction } from 'redux-form-saga';

import { takeEvery, put, call } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import axios from 'axios';

const LOGIN: string = 'LOGIN';
const SET_LOGIN: string = 'SET_LOGIN';
const SET_LOGOUT: string = 'SET_LOGOUT';
const REGISTER: string = 'REGISTER';
const LOGOUT: string = 'LOGOUT';

type LoginFormType = {
    username?: string,
    password?: string
};

type RegisterFormType = {
    username?: string,
    password?: string,
    email?: string
};

type UserType = {
    name: ?string,
    email: ?string
};

type SuccessResponseType = {
    data: {
        token: string,
        user: UserType
    }
};


const loginAction = createFormAction(LOGIN);

const registerAction = createFormAction(REGISTER);

const logoutAction = createFormAction(LOGOUT);

type AuthType = {
    user: UserType,
    token: ?string
};


const initState: AuthType = {
    user: {
        name: undefined,
        email: undefined,
        token: undefined,
    },
    token: undefined,
};

const reducer = (state: AuthType = initState, action: { type: string, payload: AuthType }): AuthType => {
    switch (action.type) {
        case SET_LOGIN:
            return action.payload;
        case SET_LOGOUT:
            return initState;
        default:
            return state;
    }
};

function* setStorageDetails({ user, token }: { user?: UserType, token?: string }): Generator<*, *, *> {
    if (user && token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.clear();
    }

    yield true;
}

function* handleLoginSaga(action: { payload: LoginFormType }): Generator<*, *, *> {
    const { username, password } = action.payload;

    try {
        const result: SuccessResponseType = yield call(axios.post, '/rest/auth/login', { username, password });
        const { data: { token, user } } = result;
        yield call(setStorageDetails, { token, user });
        yield put(loginAction.success());
        yield put(reset('login'));
        yield put({ type: SET_LOGIN, payload: { user, token } });
    } catch (e) {
        const formError = new SubmissionError({
            _error: (e.response && e.response.data && e.response.data.error) ? e.response.data.error : 'Server error',
        });

        yield put(loginAction.failure(formError));
    }
}

function* handleRegisterSaga(action: { payload: RegisterFormType }): Generator<*, *, *> {
    const { username, password, email } = action.payload;

    try {
        const result: SuccessResponseType = yield call(axios.post, '/rest/auth/register', { email, username, password });
        const { data: { token, user } } = result;
        yield call(setStorageDetails, { token, user });
        yield put(registerAction.success());
        yield put(reset('register'));
    } catch (e) {
        const formError = new SubmissionError({
            _error: (e.response && e.response.data && e.response.data.error) ? e.response.data.error : 'Server error',
        });

        yield put(registerAction.failure(formError));
    }
}

function* handleLogoutSaga(): Generator<*, *, *> {
    yield setStorageDetails({ name: null, email: null });
    yield put({ type: SET_LOGOUT });
}

function* loginSaga(): Generator<*, *, *> {
    yield takeEvery(loginAction.REQUEST, handleLoginSaga);
    yield takeEvery(registerAction.REQUEST, handleRegisterSaga);
    yield takeEvery(logoutAction.REQUEST, handleLogoutSaga);
}

export type {
    AuthType,
};

export {
    registerAction, loginSaga, logoutAction, loginAction, reducer, SET_LOGIN, SET_LOGOUT,
};

