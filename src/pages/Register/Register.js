import React, { Component } from 'react';
require('./Register.scss');

export default class Register extends Component {
  render () {
    return (
      <div className="signup-container">
        <div className="signup-header">
          <i
            className="fa fa-user-plus fa-3x signup-header__icon"
            aria-hidden="true">
          </i>
          <h1 className="signup-header__title">Register
            <span className="caption signup-header__caption">
              Please enter your data to register.
            </span>
          </h1>
        </div>
        <form className="signup-form">
          <div className="signup-field-group">
            <label
              htmlFor="username"
              className="signup-form__label">
              Username
            </label>
            <input type="text"
              name="username"
              className="signup-form__input-field"/>
            <p className="caption signup-form__caption">
              Your unique username to app
            </p>
          </div>
          <div className="signup-field-group">
            <label
              htmlFor="password"
              className="signup-form__label">
              Password
            </label>
            <input type="text"
              name="password"
              className="signup-form__input-field"/>
            <p className="caption signup-form__caption">
              Your hard to guess password
            </p>
          </div>
          <div className="signup-field-group">
            <label
              htmlFor="password-repeat"
              className="signup-form__label">
              Repeat Password
            </label>
            <input type="text"
              name="password-repeat"
              className="signup-form__input-field"/>
            <p className="caption signup-form__caption">
              Please repeat your pasword
            </p>
          </div>
          <div className="signup-field-group">
            <label
              htmlFor="email"
              className="signup-form__label">
              Email Address</label>
            <input type="email"
              name="email"
              className="signup-form__input-field"/>
            <p className="caption signup-form__caption">
              Your address email to contact
            </p>
          </div>
          <div className="signup-field-group signup-btn-group">
            <input
              type="button"
              className="btn btn--signup btn--signup-active"
              value="Register" />
            <input
              type="button"
              className="btn btn--default btn--signup"
              value="Login" />
          </div>
        </form>
      </div>
    );
  }
}
