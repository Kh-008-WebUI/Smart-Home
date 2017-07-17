import React, { Component } from 'react';
import Formsy, { HOC } from 'formsy-react';
import { Header } from '../../components/Auth/Header/Header';
import Field from '../../components/Auth/Field/Field';
import { NavLink } from 'react-router-dom';
require('./Register.scss');

export default class Register extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="signup-container">
        <Header
          pic={'fa-user'}
          title={'Register'}
          text={'Please enter your data to register.'} />
        <Formsy.Form
          onSubmit={this.submit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          className="signup-form">
          <Field
            name="Username"
            type="text"
            text={'Your unique username to app'}
            validations="isAlpha"/>
          <Field
            name="Email"
            type="email"
            text={'Your address email to contact'}
            validations="isEmail"/>
          <Field
            name="Password"
            type="password"
            text={'Your hard to guess password'}
            validations= {{
              minLength: 7,
              isAlphanumeric: true
            }}/>
          <Field
            name="Repeat-Password"
            type="password"
            text={'Please repeat your pasword'}
            validations="equalsField:password"/>
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
        </Formsy.Form>
      </div>
    );
  }
}
