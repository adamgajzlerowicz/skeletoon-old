// @flow

import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import type { Element } from 'react';

import store from './state/store';
import Login from './components/auth/login';


const Navigation = (): Element<*> =>
    (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

const App = (): Element<*> => (
    <Provider store={store}>
        <Router>
            <div>
                <Navigation />
                <hr />

                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
            </div>
        </Router>
    </Provider>
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
