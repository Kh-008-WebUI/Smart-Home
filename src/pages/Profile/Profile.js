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
require('./Profile.scss');
import { registrationSuccess } from '../../actions/auth.action';

class Profile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      canSubmit: false
    };
  }
  componentDidUpdate () {
    if (this.props.loginStatus === 'DONE') {
      setTimeout(()=>{
        this.props.history.push('/');
      }, 1000);
    }
  }
  addLogin = () => {
    const data = {
      email: this.email.getValue(),
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
      <div className="profile-container">
        <Header
          title={this.props.userData.name} />
        <Formsy.Form
          onSubmit={this.addLogin}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          className="signup-form">
          <Field
            name="E-mail"
            type="text"
            text={'Your unique username to app'}
            ref={(input) => {
              this.email = input;
            }}
            validations="isEmail"
            validationError="This is not a valid name"
            required/>
          <Field
            name="Password"
            type="password"
            text={'Your hard to guess password'}
            ref={(input) => {
              this.password = input;
            }}
            validations= {{
              minLength: 7,
              isAlphanumeric: true
            }}
            validationError="This is not a valid pass"
            required/>
          <div className="signup-field-group signup-btn-group">
            <input
              type="submit"
              disabled={!this.state.canSubmit}
              className="btn btn--signup btn--signup-active"
              value="Submit"/>
          </div>
        </Formsy.Form>
      </div>
    );
  }
}

function mapStateToProps (store) {
  return {
    loginStatus: store.authentication.status,
    userData: store.authentication.isLogged
  };
}
function mapDispatchToProps (dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
    registration: (userData) => dispatch(registrationSuccess(userData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

Profile.propTypes = {
  loginStatus: PropTypes.string,
  history: PropTypes.object,
  login: PropTypes.func,
  userData: PropTypes.object,
  registration: PropTypes.func
};
