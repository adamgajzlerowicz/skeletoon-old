// @flow

import React from 'react';
import {
    Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter as Router } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import type { Element } from 'react';

import store, { history } from './state/store';
import Login from './components/auth/login';
import Register from './components/auth/register';

import Nav from './components/nav';
import Home from './components/pages/home';
import About from './components/pages/about';

const App = (): Element<*> => (
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <Route path="/" component={Nav} />
                    <div style={{
                        marginLeft: 0,
                    }}
                    >
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/auth/login" component={Login} />
                        <Route path="/auth/register" component={Register} />
                    </div>
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>
);

export default App;
