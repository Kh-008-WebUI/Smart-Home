require('./scss/index.scss');
import createSagaMiddleware from 'redux-saga';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import MainLayout from './layouts/MainLayout/MainLayout';
import { Authorization } from './layouts/Authorization/Authorization';
import rootSaga from './sagas/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(),
                          applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/auth' component = { Authorization } />
        <Route path='/' component = { MainLayout } />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
