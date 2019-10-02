import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Router from './routes.js';
import {createStore, combineReducers} from 'redux';
import reducers from '../reducers/index'; //you can just ../reducers (webpack will automatically get index)
import { Provider } from 'react-redux';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if (document.getElementById('pediatrix')) {
    ReactDOM.render(
        <Provider store={store}>
            <Router /> 
        </Provider>,
        document.getElementById('pediatrix'));
}
