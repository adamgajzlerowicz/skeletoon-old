// @flow

import { push } from 'react-router-redux/actions';

import type { Dispatch } from 'redux';

import type { StateType } from '../store';


const protectedRoutes = [
    '/about',
];

// $FlowFixMe
const authMiddleware = ({ getState, dispatch }: { getState: () => StateType, dispatch: Dispatch<*>}): * => (next: (*) => *) => (action: ActionType): * => { // eslint-disable-line
    if (action.type === '@@router/LOCATION_CHANGE'
        && action.payload && protectedRoutes.includes(action.payload.pathname)) {
        dispatch(push('/auth/login'));
    }
    return next(action);
};

export {
    authMiddleware, authMiddleware as default,
};
