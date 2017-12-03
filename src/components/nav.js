// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
    Link,
} from 'react-router-dom';

import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import type { Element } from 'react';

import type { StateType } from '../state/type';
import type { AuthType } from '../state/ducks/auth';

class Nav extends React.Component<*, *> {
    state = { open: false };
    handleToggle = (): void => this.setState({ open: !this.state.open });
    render(): Element<*> | null {
        const loggedIn = this.props.auth.token;
        /*
            scenarios to test:
            user logged in>
            -login doesnt open
            -register doesn't open
            -sidebar visible
            -logout visible
            -avatar visible
            -oposite as below

            user not logged in>
            -oposite as above
            -top nav visible
        */


        return (
            <div>
                {loggedIn &&
                    <Drawer
                        open={this.state.open}
                        docked={false}
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
                        <Link to="/">
                            <FlatButton
                                fullWidth
                                onClick={(): void => this.setState({ open: false })}
                            >
                                Home
                            </FlatButton>
                        </Link>
                        <Link to="/about">
                            <FlatButton
                                fullWidth
                                onClick={(): void => this.setState({ open: false })}
                            >
                                About
                            </FlatButton>
                        </Link>
                        <Link to="/auth/login"><FlatButton fullWidth>Login</FlatButton></Link>
                        <Link to="/auth/register"><FlatButton fullWidth>Register</FlatButton></Link>
                    </Drawer>}
                <Toolbar>
                    <ToolbarGroup firstChild>
                        {loggedIn &&
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
                            </i>}
                        {!loggedIn &&
                            <div>
                                <Link to="/">
                                    <FlatButton
                                        fullWidth
                                        onClick={(): void => this.setState({ open: false })}
                                    >
                                        Home
                                    </FlatButton>
                                </Link>
                                <br />
                                <Link to="/about">
                                    <FlatButton
                                        fullWidth
                                        onClick={(): void => this.setState({ open: false })}
                                    >
                                        admin
                                    </FlatButton>
                                </Link>
                            </div>}
                    </ToolbarGroup>
                    {loggedIn &&
                        <ToolbarGroup>
                            {this.props.auth.user.name}
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
                                <Link to="/auth/logout">
                                    <FlatButton fullWidth style={{ height: 49 }}>Logout</FlatButton>
                                </Link>
                                <MenuItem primaryText="Profile" />
                            </IconMenu>
                        </ToolbarGroup>}
                </Toolbar>
            </div >
        );
    }
}

const mapState = (state: StateType): { auth: AuthType } => ({
    auth: state.auth,
});

const ConnectedNav = connect(mapState)(Nav);

export default ConnectedNav;
