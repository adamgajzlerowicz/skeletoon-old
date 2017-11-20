// @flow

import React from 'react';
import {
    Route,
    Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter as Router } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import type { Element } from 'react';

import store, { history } from './state/store';
import Login from './components/auth/login';
import Register from './components/auth/register';

const Navigation = (): Element<*> => (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/auth/login">Login</Link></li>
        <li><Link to="/auth/register">Register</Link></li>
    </ul>
);

const App = (): Element<*> => (
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <Navigation />
                    <hr />
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/register" component={Register} />
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>
);

const Home = (): Element<*> => (
    <div>
        <h2>Home dupa</h2>
    </div>
);

const About = (): Element<*> => (
    <div>
        <h2>About</h2>
    </div>
);

export default App;
