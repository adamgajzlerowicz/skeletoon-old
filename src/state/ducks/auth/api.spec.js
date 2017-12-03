import { reducer, SET_LOGIN, SET_LOGOUT } from './index';

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

    expect(reducer(undefined, { type: SET_LOGIN, payload })).toBe(payload);
    expect(reducer({}, { type: SET_LOGIN, payload })).toBe(payload);
    expect(reducer(payload, { type: SET_LOGIN, payload })).toBe(payload);
    expect(reducer({ foo: 'bar' }, { type: SET_LOGIN, payload })).toBe(payload);
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
    expect(reducer(payload, { type: SET_LOGOUT }))
        .toMatchObject({ user: { email: undefined, name: undefined }, token: undefined });
});
