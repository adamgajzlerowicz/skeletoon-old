// @flow

import { push } from 'react-router-redux/actions';

import type { Dispatch } from 'redux';

import type { StateType } from '../store';
import { logoutActionCreator } from '../ducks/auth';

const protectedRoutes = [
    '/about',
];

const logindRoutes = [
    '/auth/login', '/auth/register',
];

// $FlowFixMe
const authMiddleware = ({ getState, dispatch }: { getState: () => StateType, dispatch: Dispatch<*> }): * => (next: (*) => *) => (action: ActionType): * => { // eslint-disable-line

    // protect routes
    if (action.type === '@@router/LOCATION_CHANGE'
        && action.payload && protectedRoutes.includes(action.payload.pathname)) {
        return dispatch(push('/auth/login'));
    }

    // commit login when logged in
    if (action.type === '@@router/LOCATION_CHANGE'
        && (getState().auth.user && getState().auth.token)
        && action.payload && logindRoutes.includes(action.payload.pathname)) {
        return dispatch(push('/'));
    }

    // logout route
    if (action.type === '@@router/LOCATION_CHANGE' && action.payload.pathname === '/auth/logout') {
        dispatch(logoutActionCreator());
        return dispatch(push('/auth/login'));
    }

    return next(action);
};

export {
    authMiddleware, authMiddleware as default,
};
