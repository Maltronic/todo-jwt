import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import RootReducer from './reducers';

const configureStore = (env) => {
    const middlewares = [thunkMiddleware];

    if (env === 'development') {
        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */
        return createStore(RootReducer, composeEnhancers(applyMiddleware(...middlewares)));
    } else {
        return createStore(RootReducer, compose(applyMiddleware(...middlewares)));
    }
};

export default configureStore;
