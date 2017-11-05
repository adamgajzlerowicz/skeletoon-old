import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const Navigation = () =>
    (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

const App = () => (
    <Router>
        <div>
            <Navigation />
            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
        </div>
    </Router>
);

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

const Login = ({ match }) => (
    <div style={{
        width: 200, padding: 30, margin: '0 auto', textAlign: 'center',
    }}
    >
        <h2>Login</h2>
        <TextField placeholder="login" style={{ width: '100%' }} />
        <TextField type="password" placeholder="password" style={{ width: '100%' }} />
    </div>
);

const RoutePropTypes = {
    match: PropTypes.Object,
};

Login.propTypes = RoutePropTypes;

export default App;
