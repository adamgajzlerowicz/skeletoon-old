// @flow

import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import type { ActionType } from '../../type';

// constants
const GET = 'GET';
const POST = 'POST';


// action creators
const get = (url: string, payload: {}): ActionType => ({ type: GET, payload });
const post = (url: string, payload: {}): ActionType => ({ type: POST, payload });


// helper functions
const doGet = (url: string, data: {}): Promise<*> => axios.get(url, data);
const doPost = (url: string, data: {}): Promise<*> => axios.post(url, data);

// sagas:

function* getSaga(action: ActionType): Generator<*, *, *> {
    try {
        const result = yield call(doGet, action.payload);
        if (action.callback) {
            yield put(action.callback(result));
        }
    // yield put({ type: 'USER_FETCH_SUCCEEDED', payload: {} });
    } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
    }
}

function* postSaga(action: ActionType): Generator<*, *, *> {
    try {
        yield call(doPost, action.payload);
    // yield put({ type: 'USER_FETCH_SUCCEEDED', payload: {} });
    } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
    }
}

function* saga(): Generator<*, *, *> {
    yield takeEvery(GET, getSaga);
    yield takeEvery(POST, postSaga);
}


export { saga as default, get, post };

