import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Router from './routes.js';
import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import reducers from '../reducers/index'; //you can just ../reducers (webpack will automatically get index)
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunk)),
);

if (document.getElementById('spark')) {
    ReactDOM.render(
        <Provider store={store}>
            <Router /> 
        </Provider>,
        document.getElementById('spark'));
}
