import React, { Component } from 'react';
import Formsy, { HOC } from 'formsy-react';
import { Header } from '../../components/Auth/Header/Header';
import Field from '../../components/Auth/Field/Field';
import { updateProfileRequest } from '../../actions/users.action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
require('./Profile.scss');

class Profile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      canSubmit: false
    };
  }

  updateProfile = () => {
    const data = {
      name: this.name.getValue(),
      email: this.email.getValue(),
      _id: this.props.user._id
    };

    this.props.updateProfileRequest(data);
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
          title={this.props.user.name} />
        <Formsy.Form
          onSubmit={this.updateProfile}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          className="signup-form">
          <Field
            name="Name"
            type="text"
            text={'Enter your new name'}
            ref={(input) => {
              this.name = input;
            }}
            validations="isAlpha"
            validationError="This is not a valid name"
            required/>
          <Field
            name="E-mail"
            type="text"
            text={'Enter your new e-mail'}
            ref={(input) => {
              this.email = input;
            }}
            validations="isEmail"
            validationError="This is not a valid name"
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
    updateProfileStatus: store.users.updateProfileStatus,
    user: store.users.user
  };
}
function mapDispatchToProps (dispatch) {
  return {
    updateProfileRequest: bindActionCreators(updateProfileRequest, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

Profile.propTypes = {
  updateProfileStatus: PropTypes.string,
  updateProfileRequest: PropTypes.func,
  user: PropTypes.object
};
