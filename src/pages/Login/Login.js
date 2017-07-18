import React, { Component } from 'react';
import Formsy, { HOC } from 'formsy-react';
import { Header } from '../../components/Auth/Header/Header';
import Field from '../../components/Auth/Field/Field';
import { Message } from '../../components/Message/Message';
import { NavLink } from 'react-router-dom';
import { login } from '../../actions/auth.action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
require('./Login.scss');
import { registrationSuccess } from '../../actions/auth.action';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      canSubmit: false
    };
  }
  addLogin = () => {
    const data = {
      username: this.username.getValue(),
      password: this.password.getValue()
    };

    this.props.login(data);
  };
  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  };
  disableButton = () => {
    this.setState({
      canSubmit: false
    });
  };
  render () {
    return (
      <div className="login-container">
        <Header
          pic={'fa-unlock'}
          title={'Login'}
          text={'Please enter your credentials to login.'} />
        <Message status={this.props.loginStatus} />
        <Formsy.Form
          onSubmit={this.addLogin}
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
            validations="isAlphanumeric"
            validationError="This is not a valid name"
            required/>
          <Field
            name="Password"
            type="password"
            text={'Your hard to guess password'}
            ref={(input) => {
              this.password = input;
            }}
            validations={{
              matchRegexp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
            }}
            validationError="This is not a valid pass"
            required/>
          <div className="signup-field-group signup-btn-group">
            <input
              type="button"
              disabled={!this.state.canSubmit}
              className="btn btn--signup btn--signup-active"
              value="Login"
              onClick={this.addLogin} />
            <span className={'caption signup-form__caption ' +
              'signup-form__caption--text'}>
              New here?
              <NavLink to="/auth/register"
                className="signup-form__caption--link">
                Register
              </NavLink>
            </span>
          </div>
        </Formsy.Form>
      </div>
    );
  }
}

function mapStateToProps (store) {
  return {
    loginStatus: store.authentication.status,
    userData: store.authentication.user
  };
}
function mapDispatchToProps (dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
    registration: (userData) => dispatch(registrationSuccess(userData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  loginStatus: PropTypes.string,
  login: PropTypes.func,
  userData: PropTypes.object,
  registration: PropTypes.func
};
