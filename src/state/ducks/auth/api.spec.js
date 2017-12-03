
// @flow

import { authReducer } from './index';


it('Auth logs user in', () => {
    const payload = {
        payload: {
            user: {
                email: 'foo@foo.com',
                name: 'blah',
            },
            token: 'zarn',
        },
    };
    expect(authReducer(undefined, { type: 'SET_LOGIN', payload })).toBe(payload);
    expect(authReducer({}, { type: 'SET_LOGIN', payload })).toBe(payload);
    expect(authReducer(payload, { type: 'SET_LOGIN', payload })).toBe(payload);
    expect(authReducer({ foo: 'bar' }, { type: 'SET_LOGIN', payload })).toBe(payload);
});

it('Auth logs user out', () => {
    const payload = {
        payload: {
            user: {
                email: 'foo@foo.com',
                name: 'blah',
            },
            token: 'zarn',
        },
    };
    expect(authReducer(payload, { type: 'SET_LOGOUT' }))
        .toMatchObject({ user: { email: undefined, name: undefined }, token: undefined });
});
