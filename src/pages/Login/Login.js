import React, { Component } from 'react';
import { Header } from '../../components/Auth/Header/Header';
import { Field } from '../../components/Auth/Field/Field';
import { Message } from '../../components/Message/Message';
import { NavLink } from 'react-router-dom';
import { login } from '../../actions/auth.action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
require('./Login.scss');

class Login extends Component {
  render () {
    return (
      <div className="login-container">
        <Header
          pic={'fa-unlock'}
          title={'Login'}
          text={'Please enter your credentials to login.'} />
        <Message status={this.props.loginStatus} />
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
              value="Login"
              onClick={this.props.login} />
            <span className="caption signup-form__caption">
              New here?
              <NavLink to="/auth/register">
                Register
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps (store) {
  return {
    loginStatus: store.authentication.loginStatus
  };
}
function mapDispatchToProps (dispatch) {
  return {
    login: bindActionCreators(login, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  loginStatus: PropTypes.string,
  login: PropTypes.func
};
