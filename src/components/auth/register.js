// @flow

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
    Link,
} from 'react-router-dom';
import Button from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';


import { registerAction } from '../../state/ducks/auth';
import { validateEmail, isStrongPassword } from '../../helpers';

import type { FormType } from './type';
import type { Element } from 'react';
import type { Dispatch } from 'redux';

const validate = (data: FormType): FormType => {
    const errors = {};
    if (!data.password) {
        errors.password = 'Please provide password';
    }

    if (data.password && !isStrongPassword(data.password)) {
        errors.password = 'Password is not strong enough';
    }

    if (!data.username) {
        errors.username = 'Please provide login';
    }

    if (!data.email) {
        errors.email = 'Please provide email';
    }

    if (data.email && !validateEmail(data.email)) {
        errors.email = 'Please check format';
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

const RegisterForm = ({
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
            <Field
                name="password"
                type="password"
                placeholder="password"
                style={{ marginTop: 15, width: '100%' }}
                component={TextField}
            />
            <div style={{ width: '100%', display: 'flex' }}>
                <Link
                    to="/auth/login"
                    style={{ flex: 1, fontSize: 10, textAlign: 'center', lineHeight: '36px' }}
                >already have an account
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

const FormedRegister = reduxForm({ form: 'register', validate, formValues: { username: 'lkjsdf' } })(RegisterForm);

const mapDispatch = (dispatch: Dispatch<*>): { onSubmit: OnSubmitType } => ({
    onSubmit: registerAction,
});

const ConnectedRegister = connect(null, mapDispatch)(FormedRegister);

export default ConnectedRegister;
