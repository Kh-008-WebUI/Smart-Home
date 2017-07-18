import React, { Component } from 'react';
import Formsy, { HOC } from 'formsy-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from '../../components/Auth/Header/Header';
import Field from '../../components/Auth/Field/Field';
import { Message } from '../../components/Message/Message';
import { registration } from '../../actions/auth.action';
import { NavLink } from 'react-router-dom';
require('./Register.scss');

class Register extends Component {
  constructor (props) {
    super(props);
    this.state = {
      canSubmit: false
    };
    this.enableButton = () => {
      this.setState({
        canSubmit: true
      });
    };
    this.addRegisterDataToStore = (event) => {
      this.props.registration({
        username: this.username.getValue(),
        password: this.password.getValue(),
        passwordRepeat: this.passwordRepeat.getValue(),
        email: this.email.getValue()
      });
    };
  }
  render () {
    console.log(this.props.loginStatus);
    return (
      <div className="signup-container">
        <Header
          pic={'fa-user'}
          title={'Register'}
          text={'Please enter your data to register.'} />
        <Message status={this.props.loginStatus} />
        <Formsy.Form
          onSubmit={this.addRegisterDataToStore}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          className="signup-form">
          <Field
            name="Username"
            type="text"
            text={'Your unique username to app'}
            ref={(input) => {
              this.username = input;
            }}
            required="isTrue"
            validations="isAlpha"
            validationError="Name must contain only letters"/>
          <Field
            name="Email"
            type="email"
            text={'Your address email to contact'}
            ref={(input) => {
              this.email = input;
            }}
            required="isTrue"
            validations="isEmail"
            validationError="This is not a valid email"/>
          <Field
            name="Password"
            type="password"
            text={'Your hard to guess password'}
            ref={(input) => {
              this.password = input;
            }}
            required="isTrue"
            validations= {{
              minLength: 7,
              isAlphanumeric: true
            }}
            validationError={'Password is not valid'}/>
          <Field
            name="Repeat-Password"
            type="password"
            text={'Please repeat your pasword'}
            ref={(input) => {
              this.passwordRepeat = input;
            }}
            required="isTrue"
            validations="equalsField:Password"
            validationError="Password does not match"/>
          <div className="signup-field-group signup-btn-group">
            <input
              type="submit"
              name="subm"
              className="btn btn--signup btn--signup-active"
              value="Register"
              disabled={!this.state.canSubmit}/>
            <span className={'caption signup-form__caption ' +
              'signup-form__caption--text'}>
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

const mapStateToProps = state => ({
  userData: state.authentication.user,
  loginStatus: state.authentication.loginStatus
});

const mapDispatchToProps = (dispatch) => ({
  registration: (userData) => dispatch(registration(userData))
});

Register.propTypes = {
  resetValue: PropTypes.func,
  registration: PropTypes.func,
  loginStatus: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
