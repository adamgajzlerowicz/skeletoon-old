import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './app';
// import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);

if (module.hot) {
    module.hot.accept('./app', () => {
    // eslint-disable-next-line
    const NextApp = require('./app').default;
        ReactDOM.render(
            <NextApp />,
            rootEl,
        );
    });
}

// registerServiceWorker();
