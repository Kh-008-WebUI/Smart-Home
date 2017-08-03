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
      allowEditEmail: false,
      allowEditImage: true
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
    this.fieldName.classList.toggle('name-field-display');
  };
  editEmail = () => {
    this.setState({
      allowEditEmail: !this.state.allowEditEmail
    });
    this.fieldEmail.classList.toggle('email-field-display');
  };
  render () {
    return (
      <div className="profile-container">
        <Formsy.Form
          onSubmit={this.updateProfile}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          className="signup-form edit">
          <div className="profile-header">
      <div className="user-image-box">
      <div className="user-image-edit">
      <img
          src={this.props.user.avatar}
          className="user-image-profile"/>
          <i className="fa fa-pencil edit-user-info"/>
      </div>
      </div>
      <div className="profile-header-user-name">
        <Header
          title={this.props.user.name} />
          </div>
      </div>
          <section className="user-profile-info">
          <div className="edit-user-name-container">
            <div className="user-name__box">
              <p className="user-name__title">Name</p>
                 <span className="logged-name">{this.props.user.name}</span>
            </div>
            <div className="edit-name-icon">
              <i className="fa fa-pencil edit-user-info"
               onClick={this.editName} />
            </div>
            </div>
             <div
                className="hidden-field"
                ref = { (el) => {
                  this.fieldName = el;
                }
              }>
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
            />
            </div>
            <div className="edit-user-email-container">
               <div className="user-email__box">
                  <p className="user-email__title">Email</p>
                    <span className="logged-email">
                    {this.props.user.email}
                    </span>
               </div>
               <div className="edit-email-icon">
                  <i className="fa fa-pencil edit-user-info"
                  onClick={this.editEmail} />
               </div>
               </div>
                <div
                className="hidden-field"
                ref = { (el) => {
                  this.fieldEmail = el;
                }
            }>
          <Field
            name="E-mail"
            className="hidden-field"
            type="text"
            text={'Enter your new e-mail'}
            ref={(input) => {
              this.email = input;
            }}
            value={this.props.user.email}
            validations="isEmail"
            validationError="This is not a valid name"
            />
            </div>
            </section>
            <div className="signup-field-group signup-btn-group">
            <input
              type="submit"
              disabled={!this.state.canSubmit}
              className="btn btn--signup btn--signup-active edit"
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
  user: PropTypes.object,
  email: PropTypes.object,
  value: PropTypes.object
};
