// @flow

import React from 'react';
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

import size from 'get-window-size';

import type { Element } from 'react';

const isMobile = (): boolean => size().width < 700;
class Nav extends React.Component<*, *> {
    state = { open: false };
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
                            <Link to="/auth/logout"><FlatButton fullWidth style={{ height: 49 }}>Logout</FlatButton></Link>
                            <MenuItem primaryText="Profile" />
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

export default Nav;
