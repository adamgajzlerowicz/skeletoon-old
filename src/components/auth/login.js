// @flow

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Button from 'material-ui/Button';
import { TextField } from 'redux-form-material-ui';
import axios from 'axios';
import type { Dispatch } from 'redux';
import type { Element } from 'react';

type FormType = {
    username: string,
    password: string
};

type UserType = {
    name: string,
    email: string
};

type SuccessResponseType = {
    token: string,
    user: UserType
};

type ErrorResponseType = {
    response: {
        data: {
            error: string
        }
    }
};

const validate = (data: FormType): FormType => {
    const errors = {};
    if (!data.password) {
        errors.password = 'Please provide password';
    }
    if (!data.username) {
        errors.username = 'Please provide login';
    }

    return errors;
};

type FormPropsType = {
    handleSubmit: (()=>void)=>void,
    error: boolean,
    submitSucceeded: boolean,
    valid: boolean,
    submitting: boolean,
    onSubmit: ()=> void
};

const LoginForm = ({
    handleSubmit,
    error,
    submitSucceeded,
    valid,
    submitting,
    onSubmit,
}: FormPropsType): Element<*> => (
    <div style={{
        width: 300, padding: 30, margin: '0 auto', textAlign: 'center',
    }}
    >
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field name="username" label="login" style={{ width: '100%' }} component={TextField} />
            <Field name="password" type="password" label="password" style={{ width: '100%' }} component={TextField} />

            <div style={{ width: '100%', float: 'right' }}>
                <Button raised dense type="submit" color="primary" disabled={!valid && !submitting} style={{ float: 'right', marginTop: 15 }}>
                    Submit
                </Button>
            </div>
            <div style={{ width: '100%', color: 'red' }}>{error}</div>
            {submitSucceeded && <div style={{ width: '100%', color: 'green' }}>Success</div>}
        </form>
    </div>
);

const FormedLogin = reduxForm({ form: 'login', validate })(LoginForm);

const submit = (data: FormType): Promise<*> =>
    new Promise((res: () => void, rej: (SubmissionError) => void) => {
        axios.post('/auth/login', data)
            .then((resp: SuccessResponseType) => {
                const { token, user } = resp;
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('user', JSON.stringify(user));
                res();
            })
            .catch((e: ErrorResponseType) => {
                rej(new SubmissionError({
                    _error: e.response.data.error,
                }));
            });
    });

const mapDispatch = (dispatch: Dispatch<*>): { } => ({
    onSubmit: submit,
});

const ConnectedLogin = connect(null, mapDispatch)(FormedLogin);

export default ConnectedLogin;
