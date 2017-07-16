import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { Header } from '../../components/Auth/Header/Header';
import { Field } from '../../components/Auth/Field/Field';
import { NavLink } from 'react-router-dom';
require('./Register.scss');

export default class Register extends Component {
  render () {
    return (
      <div className="signup-container">
        <Header
          pic={'fa-user'}
          title={'Register'}
          text={'Please enter your data to register.'} />
        <form className="signup-form">
          <Field
            name="Username"
            text={'Your unique username to app'}/>
          <Field
            name="Email"
            text={'Your address email to contact'}/>
          <Field
            name="Password"
            text={'Your hard to guess password'}/>
          <Field
            name="Repeat-Password"
            text={'Please repeat your pasword'}/>
          <div className="signup-field-group signup-btn-group">
            <input
              type="button"
              className="btn btn--signup btn--signup-active"
              value="Register" />
            <span className="caption signup-form__caption">
              Already has account?
              <NavLink to="/auth/login"
                className="signup-form__caption--link">
                Login
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    );
  }
}
