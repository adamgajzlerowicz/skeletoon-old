// @flow

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import axios from 'axios';
import {
    Link,
} from 'react-router-dom';
import Button from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';


import type { Dispatch } from 'redux';
import type { Element } from 'react';

type FormType = {
    username?: string,
    password?: string
};

type UserType = {
    name: string,
    email: string
};

type SuccessResponseType = {
    data: {
        token: string,
        user: UserType
    }
};

type ErrorResponseType = {
    response?: {
        data: { error: string } | void | string
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

type PromiseType = Promise<*>;

type OnSubmitType = FormType => PromiseType;

type FormPropsType = {
    handleSubmit: (OnSubmitType)=>void,
    error: string | void,
    submitSucceeded: boolean,
    valid: boolean,
    submitting: boolean,
    onSubmit: OnSubmitType
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
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field name="username" placeholder="login" style={{ width: '100%' }} component={TextField} />
            <Field name="email" placeholder="email" style={{ marginTop: 15, width: '100%' }} component={TextField} />
            <Field name="password" type="password" placeholder="password" style={{ marginTop: 15, width: '100%' }} component={TextField} />
            <div style={{ width: '100%', display: 'flex' }}>
                <Link to="/auth/login" style={{ flex: 1, fontSize: 10, textAlign: 'center', lineHeight: '36px' }}>already have an account</Link>
                <Button type="submit" color="primary" disabled={!valid && !submitting} style={{ flex: 1 }}>
                    Submit
                </Button>
            </div>
            <div style={{ width: '100%', color: 'red' }}>{error}</div>
            {submitSucceeded && <div style={{ width: '100%', color: 'green' }}>Success</div>}
        </form>
    </div>
);

const FormedLogin = reduxForm({ form: 'login', validate })(LoginForm);

const submit = (data: FormType): PromiseType =>
    new Promise((res: () => void, rej: (SubmissionError) => void) => {
        axios.post('/auth/login', data)
            .then((resp: SuccessResponseType) => {
                const { data: { token, user } } = resp;

                sessionStorage.setItem('token', token);
                sessionStorage.setItem('user', JSON.stringify(user));
                res();
            })
            .catch((e: ErrorResponseType) => {
                rej(new SubmissionError({
                    _error: (e.response && e.response.data && e.response.data.error) ? e.response.data.error : 'Server error',
                }));
            });
    });


const mapDispatch = (dispatch: Dispatch<*>): {onSubmit: OnSubmitType} => ({
    onSubmit: submit,
});

const ConnectedLogin = connect(null, mapDispatch)(FormedLogin);

export default ConnectedLogin;
