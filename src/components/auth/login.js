// @flow

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
    Link,
} from 'react-router-dom';
import Button from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';

import type { Element } from 'react';

import { loginAction } from '../../state/ducks/auth';

import type { FormType } from './type';

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
    handleSubmit: (OnSubmitType) => void,
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field name="username" placeholder="login" style={{ width: '100%' }} component={TextField} />
            <Field
                name="password"
                type="password"
                placeholder="password"
                label="password"
                style={{ width: '100%' }}
                component={TextField}
            />

            <div style={{ width: '100%', display: 'flex' }}>
                <Link
                    to="/auth/register"
                    style={{ flex: 1, fontSize: 10, textAlign: 'center', lineHeight: '36px' }}
                >
                        dont have an account
                </Link>
                <Button type="submit" primary={valid} disabled={!valid && !submitting} style={{ flex: 1 }}>
                        Submit
                </Button>
            </div>
            <div style={{ width: '100%', color: 'red' }}>{error}</div>
            {submitSucceeded && <div style={{ width: '100%', color: 'green' }}>Success</div>}
        </form>
    </div>
);

const FormedLogin = reduxForm({ form: 'login', validate })(LoginForm);

const mapDispatch = (dispatch: Dispatch<*>): { } => ({
    onSubmit: loginAction,
});

const ConnectedLogin = connect(null, mapDispatch)(FormedLogin);

export default ConnectedLogin;
