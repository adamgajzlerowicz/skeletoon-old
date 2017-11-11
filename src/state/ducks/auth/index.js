import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

const LOGIN = 'LOGIN';

const loginAction = data => ({ type: LOGIN, payload: data });


// sagas:

const attemptLogin = (data) => {
    axios.post('/auth/login', data);
};

function* login(action) {
    try {
        const token = yield call(attemptLogin, action.payload);
        console.log(token);
        yield put({ type: 'USER_FETCH_SUCCEEDED', payload: {} });
    } catch (e) {
        yield put({ type: 'USER_FETCH_FAILED', message: e.message });
    }
}

function* saga() {
    console.log('pusko');
    yield takeLatest(LOGIN, login);
}


export { loginAction as default, saga, LOGIN };

