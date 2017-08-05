import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../configureStore';
import AsyncApp from './AsyncApp';
import '../App.css';

const store = configureStore(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    window.store = store;
}

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        );
    }
}
