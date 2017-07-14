import React, { Component } from 'react';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import { BrowserRouter as Router,
  Route, Switch, NavLink } from 'react-router-dom';

export const Authorization = (props) => (
  <div>
    <NavLink to="/auth/login">
          login
    </NavLink>
    <NavLink to="/auth/register">
          register
    </NavLink>
    <Switch>
      <Route exact path='/auth/login' component = { Login } />
      <Route exact path='/auth/register' component={ Register } />
    </Switch>
  </div>
);
