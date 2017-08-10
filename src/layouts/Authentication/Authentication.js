import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect,
  Route, Switch, NavLink } from 'react-router-dom';
require('./Authentication.scss');

export const Authentication = (props) => (
  <div className="auth">
   {props.children}
  </div>
);

Authentication.propTypes = {
  children: PropTypes.any
};
