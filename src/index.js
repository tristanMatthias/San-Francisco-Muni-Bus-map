import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';

import {APP_CONTAINER} from 'constants';
import Router from 'router';
import store from 'store';

// Setup the app
const render = () => {
    const app = document.querySelector(APP_CONTAINER);
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router />
            </Provider>
        </AppContainer>,
        app
    );
};

window.onload = render;
