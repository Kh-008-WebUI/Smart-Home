import React, { Component } from 'react';
import Formsy, { HOC } from 'formsy-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from '../../components/Auth/Header/Header';
import Field from '../../components/Auth/Field/Field';
import { Message } from '../../components/Message/Message';
import {
  registration,
  clearLoginStatus } from '../../actions/auth.action';
import { NavLink } from 'react-router-dom';
import './Register.scss';

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
    this.disableButton = () => {
      this.setState({
        canSubmit: false
      });
    };
    this.addRegisterDataToStore = (event) => {
      this.props.registration({
        name: this.username.getValue(),
        password: this.password.getValue(),
        passwordRepeat: this.passwordRepeat.getValue(),
        email: this.email.getValue()
      });
    };
  }
  componentDidUpdate () {
    if (this.props.regStatus === 'DONE') {
      setTimeout(()=>{
        this.props.history.push('/');
      }, 1000);
    }
  }
  render () {
    return (
      <div className="signup-container">
        <Header
          pic={'fa-user'}
          title={'Register'}
          text={'Please enter your data to register.'} />
        <Message
          clearStatus={this.props.clearLoginStatus}
          status={this.props.regStatus}
          header={'Error'}
          text={this.props.errorText}/>
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
            required
            validations="isAlpha"
            validationError="Name must contain only letters"/>
          <Field
            name="Email"
            type="text"
            text={'Your address email to contact'}
            ref={(input) => {
              this.email = input;
            }}
            required
            validations="isEmail"
            validationError="This is not a valid email"/>
          <Field
            name="Password"
            type="password"
            text={'Your hard to guess password'}
            ref={(input) => {
              this.password = input;
            }}
            required
            validations= {{
              minLength: 7,
              isAlphanumeric: true
            }}
            validationError={'Password is not valid'}/>
          <Field
            name="Repeat Password"
            type="password"
            text={'Please repeat your pasword'}
            ref={(input) => {
              this.passwordRepeat = input;
            }}
            required
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
  regStatus: state.authentication.status,
  errorText: state.authentication.errorText
});

const mapDispatchToProps = (dispatch) => ({
  registration: (userData) => dispatch(registration(userData)),
  clearLoginStatus: () => dispatch(clearLoginStatus())
});

Register.propTypes = {
  resetValue: PropTypes.func,
  history: PropTypes.object,
  registration: PropTypes.func,
  regStatus: PropTypes.string,
  errorText: PropTypes.string,
  clearLoginStatus: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
