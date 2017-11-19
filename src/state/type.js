// @flow

type ActionType = {
    type: string,
    payload?: {} | string,
    callback?: (ActionType) => void
};

export type {
    ActionType,
};
