import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { SubmissionError } from 'redux-form';

const LOGIN = 'LOGIN';

const loginAction = data => ({ type: LOGIN, payload: data });


// sagas:

const attemptLogin = data => axios.post('/auth/login', data);

const setToken = (token) => {
    sessionStorage.setItem('token', token);
};

function* login(action) {
    try {
        const { data: { token } } = yield call(attemptLogin, action.payload);
        yield call(setToken, token);
        yield put({ type: 'USER_FETCH_SUCCEEDED', payload: {} });
    } catch (e) {
        throw new SubmissionError({
            _error: 'dupa',
        });
        // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
    }
}

function* saga() {
    yield takeLatest(LOGIN, login);
}


export { loginAction as default, saga, LOGIN };

