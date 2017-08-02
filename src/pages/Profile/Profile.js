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
      canSubmit: false,
      allowEditName: false,
      allowEditEmail: false
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
  editName = () => {
    this.setState({
      allowEditName: !this.state.allowEditName
    });
  };
  editEmail = () => {
    this.setState({
      allowEditEmail: !this.state.allowEditEmail
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
          className="signup-form edit">
            <div className="user-name-box">
              <p className="name-title">Name</p>
                 <span className="logged-name">{this.props.user.name}</span>
            </div>
            <div className="name-field-edit">
              <i className="fa fa-pencil edit-user-info"
              onClick={this.editName} />
              { this.state.allowEditName ?
          <Field
            name="Name"
            type="text"
            text={'Enter your new name'}
            ref={(input) => {
              this.name = input;
            }}
            value={this.props.user.name}
            validations="isAlpha"
            validationError="This is not a valid name"
            required/> : null }
            </div>
               <div className="email-name-box">
                  <p className="email-title">Email</p>
                    <span className="logged-email">
                    {this.props.user.email}
                    </span>
               </div>
               <div className="email-field-edit">
                  <i className="fa fa-pencil edit-user-info"
                  onClick={this.editEmail} />
                  {this.state.allowEditEmail ?
          <Field
            name="E-mail"
            type="text"
            text={'Enter your new e-mail'}
            ref={(input) => {
              this.email = input;
            }}
            value={this.props.user.email}
            validations="isEmail"
            validationError="This is not a valid name"
            required/> : null }
            </div>
          <div className="signup-field-group signup-btn-group">
            <input
              type="submit"
              disabled={!this.state.canSubmit}
              className="btn btn--signup btn--signup-active edit"
              value="Submit"/>
          </div>
          <img src={this.props.user.avatar} />
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
  user: PropTypes.object,
  email: PropTypes.object,
  value: PropTypes.object
};
