import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Button from 'material-ui/Button';
import { TextField } from 'redux-form-material-ui';

import login from '../../state/ducks/auth';

const LoginForm = ({ handleSubmit, ...props }) => {
    console.log(props);
    return (
        <div style={{
            width: 200, padding: 30, margin: '0 auto', textAlign: 'center',
        }}
        >
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <Field name="username" placeholder="login" style={{ width: '100%' }} component={TextField} />
                <Field name="password" type="password" placeholder="password" style={{ width: '100%' }} component={TextField} />
                <Button raised dense type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

const FormedLogin = reduxForm({ form: 'login' })(LoginForm);
const mapState = state => ({
    foo: 'ba',
});

const mapDispatch = dispatch => ({
    onSubmit: (data) => {
        dispatch(login(data));
        console.log(data);
    },
});
const ConnectedLogin = connect(mapState, mapDispatch)(FormedLogin);

export default ConnectedLogin;
