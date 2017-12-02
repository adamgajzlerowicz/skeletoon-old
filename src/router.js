// @flow

import React from 'react';
import {
    Route,
    Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter as Router } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import size from 'get-window-size';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import type { Element } from 'react';

import store, { history } from './state/store';
import Login from './components/auth/login';
import Register from './components/auth/register';

import { Page } from './components/elements/page';

const isMobile = (): boolean => size().width < 700;

class Nav extends React.Component<*, *> {
    state = { open: !isMobile() };
    handleToggle = (): void => this.setState({ open: !this.state.open });
    render(): Element<*> | null {
        const hideNav = ['/auth/register', '/auth/login'].includes(this.props.location.pathname);
        if (hideNav) {
            return null;
        }
        const mobile = isMobile();
        return (
            <div>
                <Drawer
                    open={this.state.open}
                    docked={!mobile}
                    onRequestChange={(open: boolean): void => this.setState({ open })}
                >
                    <Toolbar style={{ padding: 0 }}>
                        <i
                            className="material-icons"
                            onClick={this.handleToggle}
                            onKeyDown={this.handleToggle}
                            role="presentation"
                            style={{
                                padding: 20,
                                cursor: 'pointer',
                            }}
                        >menu
                        </i>
                    </Toolbar>
                    <Link to="/"><FlatButton fullWidth>Home</FlatButton></Link>
                    <Link to="/about"><FlatButton fullWidth>About</FlatButton></Link>
                    <Link to="/auth/login"><FlatButton fullWidth>Login</FlatButton></Link>
                    <Link to="/auth/register"><FlatButton fullWidth>Register</FlatButton></Link>
                </Drawer>
                <Toolbar>
                    <ToolbarGroup firstChild>
                        <i
                            className="material-icons"
                            onClick={this.handleToggle}
                            onKeyDown={this.handleToggle}
                            role="presentation"
                            style={{
                                padding: 20,
                                cursor: 'pointer',
                            }}
                        >menu
                        </i>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        Adam
                        <Avatar
                            src="https://image.flaticon.com/icons/png/512/0/93.png"
                            size={30}
                            style={{ margin: 5 }}
                        />
                        <ToolbarSeparator />

                        <IconMenu iconButtonElement={
                            <IconButton touch>
                                <NavigationExpandMoreIcon />
                            </IconButton>
                        }
                        >
                            <MenuItem primaryText="Logout" />
                            <MenuItem primaryText="Profile" />
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

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

const Home = (): Element<*> => (
    <Page header="Home">
        <div>Home dupa</div>
    </Page>
);

const About = (): Element<*> => (
    <Page header="Home">
        <div>About</div>
    </Page>
);

export default App;
