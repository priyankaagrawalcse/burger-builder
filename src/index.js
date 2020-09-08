import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import createSagaMiddleWare from 'redux-saga'
import thunk from 'redux-thunk'

import burgerBuilderReducer from './store/reducers/burgerBuilder'
import ordersReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'
import {watchAuth, watchBurgerBuilder, watchOrder} from './store/sagas/index'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancer = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = combineReducers({
    burgerBuilder : burgerBuilderReducer,
    order : ordersReducer,
    auth : authReducer
})
const sagaMiddleWare = createSagaMiddleWare()
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk, sagaMiddleWare)));
//const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
//const store = createStore(burgerBuilderReducer, devtools)
sagaMiddleWare.run(watchAuth);
sagaMiddleWare.run(watchBurgerBuilder)
sagaMiddleWare.run(watchOrder)
ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
                ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
