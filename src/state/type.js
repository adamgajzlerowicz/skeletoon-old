// @flow

import type { AuthType } from './ducks/auth';


type ActionType = {
    type: string,
    payload?: {} | string,
    callback?: (ActionType) => void
};

type StateType = {
    foo: {},
    form: {},
    router: {},
    auth: AuthType
};


export type {
    ActionType, StateType,
};
