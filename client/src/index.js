import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './redux/rootReducer';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
};

const store = createStore(rootReducer);

const app = (
    <Provider store ={store}>
        <AlertProvider template={AlertTemplate} {...options}>
            <App />
        </AlertProvider>            

    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
