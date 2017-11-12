import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Button from 'material-ui/Button';
import { TextField } from 'redux-form-material-ui';
import axios from 'axios';
import { Map } from 'immutable';

const login = data => new Promise((res, rej) => {
    axios.post('/auth/login', data)
        .then((x) => {
            console.log(x);
            res();
        })
        .catch((e) => {
            rej(new SubmissionError({
                _error: e.response.data.error,
            }));
        });
});

const validate = (data) => {
    const errors = {};
    if (!data.password) {
        errors.password = 'Please provide password';
    }
    if (!data.username) {
        errors.username = 'Please provide login';
    }

    return errors;
};

const LoginForm = ({
    handleSubmit, valid, submitting, ...props
}) => {
    console.log(props);
    return (
        <div style={{
            width: 200, padding: 30, margin: '0 auto', textAlign: 'center',
        }}
        >
            <h2>Login</h2>
            <form onSubmit={handleSubmit(login)}>
                <Field name="username" placeholder="login" style={{ width: '100%' }} component={TextField} />
                <Field name="password" type="password" placeholder="password" style={{ width: '100%' }} component={TextField} />
                <Button raised dense type="submit" disabled={!valid && !submitting}>
                    Submit
                </Button>
                {props.error}
            </form>
        </div>
    );
};

const FormedLogin = reduxForm({ form: 'login', validate })(LoginForm);

const ConnectedLogin = connect()(FormedLogin);

export default ConnectedLogin;
