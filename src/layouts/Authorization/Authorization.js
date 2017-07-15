import React, { Component } from 'react';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import { BrowserRouter as Router,
  Route, Switch, NavLink } from 'react-router-dom';
require('./Authorization.scss');

export const Authorization = (props) => (
  <div className="auth clearfix">
    <NavLink to="/auth/login" className="btn btn--auth">
          login
    </NavLink>
    <NavLink to="/auth/register" className="btn btn--auth">
          register
    </NavLink>
    <Switch>
      <Route exact path='/auth/login' component = { Login } />
      <Route exact path='/auth/register' component={ Register } />
    </Switch>
  </div>
);
