import React, { Component } from 'react';
import Formsy, { HOC } from 'formsy-react';
import Input from '../../components/Input/Input';
import {
  updateProfileRequest,
  deleteUserRequest,
  clearUpdateProfileStatus,
  uploadPhotoFailure } from '../../actions/users.action';
import { bindActionCreators } from 'redux';
import { Message } from '../../components/Message/Message';
import { Popup } from '../../components/Popup/Popup';
import { Button } from '../../components/Button/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Profile.scss';

class Profile extends Component {
  constructor (props) {
    super(props);

    this.state = {
      disabled: true,
      canSubmit: false,
      imageBase64: null,
      popupShown: false,
      updateImageStatus: ''
    };
  }

  setPopupShown = (id) => {
    const currentState = this.state.popupShown;

    this.setState({
      popupShown: !currentState
    });
  };

  updateProfile = () => {
    const data = {
      name: this.name.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
      passwordRepeat: this.passwordRepeat.getValue(),
      avatar: this.base64Str,
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

  editData = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };

  deleteUser = () => {
    this.props.deleteUserRequest(this.props.user);
  }

  handleFileSelect = (e) => {
    e.preventDefault();
    this.setState({ updateImageStatus: 'Loading...' });
    const files = e.target.files ? e.target.files : e.dataTransfer.files;

    if (files) {
      const file = files[0];

      if (file) {
        const maxFileSize = 1024 * 1024;

        if (file.size > maxFileSize) {
          this.props.uploadPhotoFailure('Exceeding 1MB limit');
          this.setState({
            updateImageStatus: 'Exceeding 1MB limit',
            setPopupShown: true
          });
          return;
        }

        const reader = new FileReader();

        reader.onload = (readerEvent) => {
          const binaryString = readerEvent.target.result;

          this.base64Str = 'data:image/jpeg;base64,' + btoa(binaryString);
          this.setState({ imageBase64: this.base64Str, updateImageStatus: '' });
        };

        reader.readAsBinaryString(file);
      }
    }
  }

  preventDefault = (event) => {
    event.preventDefault();
  }

  componentDidUpdate () {
    if (this.props.updateProfileStatus === 'DONE') {
      setTimeout(() => {
        this.props.history.push('/');
      }, 1000);
    }
    if (this.props.deleteProfileStatus === 'DONE') {
      setTimeout(() => {
        this.props.history.push('/auth');
      }, 1000);
    }
  }

  render = () => {
    window.addEventListener('dragover', function (e) {
      const dragoverForBody = e || event;

      dragoverForBody.preventDefault();
    }, false);

    window.addEventListener('drop', function (e) {
      const dropForBody = e || event;

      dropForBody.preventDefault();
    }, false);

    return (
      <section className="profile">
        <header className="profile__header">
          <h1 className="profile__header-title">
            Profile
          </h1>
          <button className="profile__delete btn btn--danger"
                  onClick={this.setPopupShown}>
            Delete profile
          </button>
        </header>
        <section className="profile-info">
          <Formsy.Form
            className="profile-form clearfix"
            onSubmit={this.updateProfile}
            onValid={this.enableButton}
            onInvalid={this.disableButton}>
            <div className={this.state.imageBase64 || this.props.user.avatar ?
              'profile__photo' : 'profile__photo profile__photo--noavatar'} >
               {this.state.imageBase64 || this.props.user.avatar ? <img
                    src={ this.state.imageBase64 || this.props.user.avatar }
                    alt="avatar"/> : null
              }
            </div>
            <div className="profile-info__fields">
              <Input
                label={'NAME'}
                name={'name'}
                value={this.props.user.name}
                disabled={this.state.disabled}
                ref={(input) => {
                  this.name = input;
                }}
                validations="isAlpha"
                validationError="Name must contain only letters"/>
              <Input
                label={'EMAIL'}
                name={'email'}
                value={this.props.user.email}
                disabled={this.state.disabled}
                ref={(input) => {
                  this.email = input;
                }}
                validations="isEmail"
                validationError="This is not a valid email"/>
              {!this.state.disabled ?
                <fieldset className="profile-info__fields--fieldset">
                  <legend><h3 className="profile-heading">
                    Change password:
                  </h3></legend>
                  <Input
                    label={'Old'}
                    name={'old-psw'}
                    type={'password'}
                    placeholder={'Enter the old password'}
                    disabled={this.state.disabled}
                    ref={(input) => {
                      this.passwordOld = input;
                    }}
                    validations= {{
                      minLength: 7,
                      isAlphanumeric: true
                    }}
                    validationError={'Password is not valid'}/>
                  <Input
                    label={'New'}
                    name={'new-psw'}
                    type={'password'}
                    placeholder={'Enter the new password'}
                    disabled={this.state.disabled}
                    ref={(input) => {
                      this.password = input;
                    }}
                    validations= {{
                      minLength: 7,
                      isAlphanumeric: true
                    }}
                    validationError={'Password is not valid'}/>
                  <Input
                    label={'Repeat'}
                    name={'repeat-psw'}
                    type={'password'}
                    placeholder={'Repeat the password'}
                    disabled={this.state.disabled}
                    ref={(input) => {
                      this.passwordRepeat = input;
                    }}
                    validations="equalsField:new-psw"
                    validationError="Password does not match"/>
                    <div>
                  </div>
                </fieldset> : null
              }
              {!this.state.disabled ?
                <div className="profile-info__upload-photo">
                  <h3 className="profile-heading">Upload new photo</h3>
                  <div
                    className="profile__upload-photo--drop"
                    ref={el => {
                      this.fieldImage = el;
                    }}
                    onDrop={this.handleFileSelect}
                    onDragOver={this.preventDefault}>
                    <span>Drop your photo</span>
                  </div>
                  <div className="profile__upload-photo--btn">
                    <label
                      htmlFor="add-photo"
                      className="btn add-photo-btn">
                        Choose file to upload
                      <input
                        type="file"
                        id="add-photo"
                        onChange={this.handleFileSelect}
                        className="hide"/>
                    </label>
                  </div>
                </div> : null
              }
              <div className="profile-btn-group">
                {this.state.disabled ?
                  <button className="profile__update btn"
                        onClick={this.editData}>
                    Update info
                  </button> :
                  <input
                    type="submit"
                    disabled={!this.state.canSubmit}
                    className="btn btn--success"
                    value="Save changes" />
                }
                {!this.state.disabled ?
                  <button className="profile__delete btn"
                          onClick={this.editData}>
                    Cancel
                  </button> : null
                }
              </div>
            </div>
          </Formsy.Form>
        </section>
        <Message
          clearStatus={this.props.clearStatus}
          status={this.props.updateProfileStatus}
          text={this.props.errorText}
          header={'Error'} />
        <Popup
          setPopupShown={this.setPopupShown}
          popupShown={this.state.popupShown}
          header="Confirm the action"
          text={'Are you sure you want to delete your account?'}>
          <Button
            setPopupShown={this.setPopupShown}
            okHandler={() => {
              this.deleteUser();
              this.setPopupShown();
            }}
            className={'btn popup__btn'}
            innerText={'Ok'}
          />
          <Button
            okHandler={() => {
              this.setPopupShown();
            }}
            className={'btn btn--default popup__btn'}
            innerText={'Cancel'}
          />
        </Popup>
      </section>
    );
  }
}

function mapStateToProps (store) {
  return {
    updateProfileStatus: store.users.updateProfileStatus,
    deleteProfileStatus:  store.users.deleteProfileStatus,
    errorText: store.users.user.errorText,
    user: store.users.user
  };
}
function mapDispatchToProps (dispatch) {
  return {
    updateProfileRequest: bindActionCreators(updateProfileRequest, dispatch),
    deleteUserRequest: bindActionCreators(deleteUserRequest, dispatch),
    clearStatus: bindActionCreators(clearUpdateProfileStatus, dispatch),
    uploadPhotoFailure: bindActionCreators(uploadPhotoFailure, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

Profile.propTypes = {
  updateProfileStatus: PropTypes.string,
  updateProfileRequest: PropTypes.func,
  deleteUserRequest: PropTypes.func,
  deleteProfileStatus: PropTypes.string,
  user: PropTypes.object,
  email: PropTypes.object,
  password: PropTypes.object,
  passwordRepeat: PropTypes.object,
  errorText: PropTypes.string,
  value: PropTypes.object,
  history: PropTypes.object,
  clearStatus: PropTypes.func,
  type: PropTypes.string,
  setValue: PropTypes.any,
  uploadPhotoFailure: PropTypes.func
};
