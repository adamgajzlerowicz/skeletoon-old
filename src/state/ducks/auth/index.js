import { put, takeLatest } from 'redux-saga/effects';


const LOGIN = 'LOGIN';

const loginAction = data => ({ type: LOGIN, payload: data });


// sagas:

function* login(action) {
    try {
        console.log('dupa');
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

