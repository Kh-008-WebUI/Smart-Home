import React, { Component } from 'react';
import { Header } from '../../components/Auth/Header/Header';
import { Field } from '../../components/Auth/Field/Field';

export default class Login extends Component {
  render () {
    return (
      <div className="signup-container">
        <Header
          pic={'fa-unlock'}
          title={'Login'}
          text={'Please enter your credentials to login.'} />
        <form className="signup-form">
          <Field
            name="Username"
            text={'Your unique username to app'}/>
          <Field
            name="Password"
            text={'Your hard to guess password'}/>
          <div className="signup-field-group signup-btn-group">
            <input
              type="button"
              className="btn btn--signup btn--signup-active"
              value="Login" />
            <input
              type="button"
              className="btn btn--default btn--signup"
              value="Register" />
          </div>
        </form>
      </div>
    );
  }
}
