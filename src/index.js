import styles from './scss/index.scss';
import './pages/Register/Register.scss';
import createSagaMiddleware from 'redux-saga';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import MainLayout from './layouts/MainLayout/MainLayout';
import { Authentication } from './layouts/Authentication/Authentication';
import rootSaga from './sagas/index';
import { config } from './config/config';
import { loadAsync } from './utils/utils';
const Login = (props) => (
  loadAsync(() => import('./pages/Login/Login'), props)
);
const Register = (props) => (
  loadAsync(() => import('./pages/Register/Register'), props)
);
const DeviceList = (props) => (
  loadAsync(() => import('./pages/DeviceList/DeviceList'), props)
);
const Builder = (props) => (
  loadAsync(() => import('./pages/Builder/Builder'), props)
);
const Dashboard = (props) => (
  loadAsync(() => import('./pages/Dashboard/Dashboard'), props)
);
const DevicePage = (props) => (
  loadAsync(() => import('./pages/DevicePage/DevicePage'), props)
);
const Profile = (props) => (
  loadAsync(() => import('./pages/Profile/Profile'), props)
);
const LocationList = (props) => (
  loadAsync(() => import('./pages/LocationList/LocationList'), props)
);
const NotFound = (props) => (
  loadAsync(() => import('./components/NotFound/NotFound'), props)
);

export const ws = new WebSocket(`wss://${config.origin}/`);

const composeEnhancers = config.production ?
  compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/auth' component={() => (
          <Authentication>
            <Switch>
              <Route
                exact path='/auth'
                component={Login} />
              <Route
                exact path='/auth/login'
                component={Login} />
              <Route
                exact path='/auth/register'
                component={Register} />
              <Route component={NotFound}/>
            </Switch>
          </Authentication>
        )} />
        <Route path='/' component={(props) => (
          <MainLayout history={props.history}>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/devices/device/:id' component={DevicePage} />
              <Route exact path='/devices' component={DeviceList} />
              <Route path='/devices/:location' component={LocationList} />
              <Route path='/builder' component={Builder} />
              <Route exact path='/user' component={Profile} />
              <Route path='/device/edit/:id' component={Builder} />
              <Route path='*' component={NotFound}/>
            </Switch>
          </MainLayout>
        )} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
