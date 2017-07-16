import React, { Component } from 'react';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import { Redirect,
  Route, Switch, NavLink } from 'react-router-dom';
require('./Authentication.scss');

export const Authentication = (props) => (
  <div className="auth clearfix">
   <NavLink to="/" className="btn btn--active">Home</NavLink>
    <Switch>
      <Route exact path='/auth' component = { Login } />
      <Route exact path='/auth/login' component = { Login } />
      <Route exact path='/auth/register' component={ Register } />
    </Switch>
  </div>
);
