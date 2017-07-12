require('./scss/index.scss');
import createSagaMiddleware from 'redux-saga';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/reducer';
import DeviceList from './pages/DeviceList/DeviceList';
import DevicePage from './pages/DevicePage/DevicePage';
import { Builder } from './pages/Builder/Builder';
import MainLayout from './layouts/MainLayout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import rootSaga from './sagas/sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(),
                          applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MainLayout>
      <Switch>
        <Route exact path='/' component = { Dashboard } />
        <Route path='/devices/device/:id' component={DevicePage}></Route>
        <Route path='/devices' component={DeviceList}></Route>
        <Route path='/builder' component={Builder}></Route>
      </Switch>
      </MainLayout>
    </Router>
  </Provider>,
  document.getElementById('root')
);
