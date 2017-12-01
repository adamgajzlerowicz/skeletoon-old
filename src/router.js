// @flow

import React from 'react';
import {
    Route,
    Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter as Router } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
// import IconMenu from 'material-ui/IconMenu';
// import IconButton from 'material-ui/IconButton';
// import FontIcon from 'material-ui/FontIcon';
// import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


import type { Element } from 'react';

import store, { history } from './state/store';
import Login from './components/auth/login';
import Register from './components/auth/register';

// const Navigation = (): Element<*> => (
//     <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/auth/login">Login</Link></li>
//         <li><Link to="/auth/register">Register</Link></li>
//     </ul>
// );

class Nav extends React.Component<*, *> {
    // constructor() {
    //     super();
    //     this.state = { open: false };
    // }
    state = { open: true };
    handleToggle = (): void => this.setState({ open: !this.state.open });

    render(): Element<*> {
        return (
            <div>
                <RaisedButton label="Toggle Drawer" onClick={this.handleToggle} />
                <Drawer open={this.state.open} docked>
                    <MenuItem><Link to="/">Home</Link></MenuItem>
                    <MenuItem><Link to="/about">About</Link></MenuItem>
                    <MenuItem><Link to="/auth/login">Login</Link></MenuItem>
                    <MenuItem><Link to="/auth/register">Register</Link></MenuItem>
                </Drawer>
            </div>
        );
    }
}
// <Toolbar>
//     <ToolbarGroup firstChild />
//     <ToolbarGroup>
//         <ToolbarTitle text="Options" />
//         <FontIcon className="muidocs-icon-custom-sort" />
//         <ToolbarSeparator />
//         <RaisedButton label="Create Broadcast" primary />
//         <IconMenu iconButtonElement={
//             <IconButton touch>
//                 <NavigationExpandMoreIcon />
//             </IconButton>
//         }
//         >
//             <MenuItem primaryText="Download" />
//             <MenuItem primaryText="More Info" />
//         </IconMenu>
//     </ToolbarGroup>
// </Toolbar>
const App = (): Element<*> => (
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <Nav />

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
