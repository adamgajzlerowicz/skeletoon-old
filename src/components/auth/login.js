import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Button from 'material-ui/Button';
import { TextField } from 'redux-form-material-ui';
import axios from 'axios';

const login = data => new Promise((res, rej) => {
    axios.post('/auth/login', data)
        .then((resp) => {
            const { token, user } = resp;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', user);
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
    handleSubmit, error, submitSucceeded, valid, submitting, ...props
}) => {
    console.log(props);
    return (
        <div style={{
            width: 300, padding: 30, margin: '0 auto', textAlign: 'center',
        }}
        >
            <h2>Login</h2>
            <form onSubmit={handleSubmit(login)}>
                <Field name="username" label="login" style={{ width: '100%' }} component={TextField} />
                <Field name="password" type="password" label="password" style={{ width: '100%', marginTop: 10 }} component={TextField} />

                <div style={{ width: '100%', float: 'right' }}>
                    <Button raised dense type="submit" disabled={!valid && !submitting} style={{ float: 'right', marginTop: 15 }}>
                    Submit
                    </Button>
                </div>
                <div style={{ width: '100%', color: 'red' }}>{error}</div>
                {submitSucceeded && <div style={{ width: '100%', color: 'green' }}>Success</div>}
            </form>
        </div>
    );
};

const FormedLogin = reduxForm({ form: 'login', validate })(LoginForm);

const ConnectedLogin = connect()(FormedLogin);

export default ConnectedLogin;
