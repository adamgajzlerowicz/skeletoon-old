import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';


const rootEl = document.getElementById('root');

ReactDOM.render(<Router />, rootEl);

if (module.hot) {
  module.hot.accept('./router', () => {
    // eslint-disable-next-line
    const NextApp = require('./router').default;
    ReactDOM.render(
        <NextApp />,
        rootEl,
    );
  });
}

registerServiceWorker();
