import React from 'react';
import TextField from 'material-ui/TextField';

const Login = () => (
    <div style={{
        width: 200, padding: 30, margin: '0 auto', textAlign: 'center',
    }}
    >
        <h2>Login</h2>
        <TextField placeholder="login" style={{ width: '100%' }} />
        <TextField type="password" placeholder="password" style={{ width: '100%' }} />
    </div>
);

export default Login;
