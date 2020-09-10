import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

const middleware = [thunk];

const store = createStore(
    allReducers,
    compose(
        applyMiddleware(...middleware)
    )
);

export default store;