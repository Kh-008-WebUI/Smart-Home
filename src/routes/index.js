import React from 'react';
import { loadAsync } from '../utils/utils';
import MainLayout from '../layouts/MainLayout/MainLayout';
import { Authentication } from '../layouts/Authentication/Authentication';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loading } from '../layouts/Loading/Loading';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLoggedUser } from '../actions/auth.action';

const locationHelper = locationHelperBuilder({});
const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/auth',
  authenticatedSelector: state => state.authentication.isLogged !== null,
  wrapperDisplayName: 'UserIsAuthenticated',
  authenticatingSelector: state => state.authentication.status === 'PENDING',
  AuthenticatingComponent: Loading
});
const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.authentication.isLogged === null,
  wrapperDisplayName: 'UserIsNotAuthenticated'
});

const Login = (props) => (
  loadAsync(() => import('../pages/Login/Login'), props)
);
const Register = (props) => (
  loadAsync(() => import('../pages/Register/Register'), props)
);
const DeviceList = (props) => (
  loadAsync(() => import('../pages/DeviceList/DeviceList'), props)
);
const Builder = (props) => (
  loadAsync(() => import('../pages/Builder/Builder'), props)
);
const Dashboard = (props) => (
  loadAsync(() => import('../pages/Dashboard/Dashboard'), props)
);
const DevicePage = (props) => (
  loadAsync(() => import('../pages/DevicePage/DevicePage'), props)
);
const Profile = (props) => (
  loadAsync(() => import('../pages/Profile/Profile'), props)
);
const LocationList = (props) => (
  loadAsync(() => import('../pages/LocationList/LocationList'), props)
);
const NotFound = (props) => (
  loadAsync(() => import('../components/NotFound/NotFound'), props)
);
const Main = (props) => (
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
);

Main.propTypes = {
  history: PropTypes.object
};
const Auth = () => (
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
);
const App = (props) => {
  if (!props.user) {
    props.getLoggedUser();
  }
  return (
    <Router>
      <Switch>
        <Route path='/auth' component={userIsNotAuthenticated(Auth)} />
        <Route path='/' component={userIsAuthenticated(Main)} />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  user: PropTypes.object,
  getLoggedUser: PropTypes.func
};
const mapStateToProps = state => ({
  user: state.authentication.isLogged
});
const mapDispatchToProps = (dispatch) => ({
  getLoggedUser: bindActionCreators(getLoggedUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
