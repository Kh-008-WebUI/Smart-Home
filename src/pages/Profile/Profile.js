import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Formsy, { HOC } from 'formsy-react';
import Field from '../../components/Auth/Field/Field';
import { updateProfileRequest } from '../../actions/users.action';
import { bindActionCreators } from 'redux';
import { Message } from '../../components/Message/Message';
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
      allowEditImage: false,
      updateImageStatus: 'Drop your photo',
      imageBase64: null
    };
  }
  updateProfile = () => {
    const data = {
      name: this.name.getValue(),
      email: this.email.getValue(),
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

  editName = () => {
    this.setState({
      allowEditName: !this.state.allowEditName
    });
    this.fieldName.classList.toggle('hidden');
    this.fieldName.classList.toggle('flex-display');
  };

  editEmail = () => {
    this.setState({
      allowEditEmail: !this.state.allowEditEmail
    });
    this.fieldEmail.classList.toggle('hidden');
    this.fieldEmail.classList.toggle('flex-display');
  };

  editImage = () => {
    this.setState({
      allowEditImage: !this.state.allowEditImage
    });
    this.fieldImage.classList.toggle('hidden');
    this.fieldImage.classList.toggle('flex-display');
  };

  handleFileSelect = (e) => {
    e.preventDefault();
    this.setState({ updateImageStatus: 'Loading...' });
    const files = e.dataTransfer.files;

    if (files) {
      const file = files[0];

      if (file) {
        const maxFileSize = 1024 * 1024;

        if (file.size > maxFileSize) {
          this.setState({ updateImageStatus: 'Exceeding 1MB limit' });
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
      setTimeout(()=>{
        this.props.history.push('/');
      }, 1000);
    }
  }
  render = () => {
    return (
      <div className="profile-container">
        {/* <input name="Image" type="file"
          onChange={this.handleFileSelect} /> */}
        <Message
          status={this.props.updateProfileStatus}
          text={this.props.errorText}
        />
        <Formsy.Form
          onSubmit={this.updateProfile}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          className="signup-form edit">
          <div className="profile-header">
            <div className="profile-header__user-image-box">
              <div className="profile-header__user-image-edit">
                <div className={this.props.user.avatar ?
                  'visible' :
                  'hidden'
                }>
                  <img className="profile-header__user-image"
                    src={this.props.user.avatar} />
                </div>
                <div className={this.props.user.avatar ?
                  'hidden' :
                  'visible'
                }>
                  <i className="fa fa-user-circle-o photo"></i>
                </div>
                <i className="fa fa-pencil edit-user-info edit-image"
                  onClick={this.editImage} />
                <div className="hidden"
                  ref={(el) => {
                    this.fieldImage = el;
                  }
                }
                  onDrop={this.handleFileSelect}
                  onDragOver={this.preventDefault}>
                  <div>
                    <div className= {
                      this.state.updateImageStatus !== '' ?
                      'profile-header__user-drop-aria' :
                      'profile-header__user-drop-image hidden'
                    }>{this.state.updateImageStatus}</div>
                    <img className= {
                      this.state.updateImageStatus !== '' ?
                      'profile-header__user-image hidden' :
                      'profile-header__user-image'
                    }
                    src={this.state.imageBase64} /></div>
                </div>
              </div>
              <div className="profile-header__user-name">
                {this.props.user.name}
              </div>
            </div>
          </div>
          <section className="edit-profile__user-info">
            <div className="edit-profile-name">
              <div className="edit-profile__user-name-container">
                <div className="user-name__box">
                  <p className="user-name__title">Name</p>
                  <span className="user-name__logged-name">
                    {this.props.user.name}
                  </span>
                </div>
                <div className="edit-user-info__icon">
                  <i className="fa fa-pencil edit-user-info"
                    onClick={this.editName} />
                </div>
              </div>
              <div
                className="hidden"
                ref={(el) => {
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
                  validationError="Name is not valid"
                />
              </div>
            </div>
            <div className="edit-profile-email">
              <div className="edit-profile__user-email-container">
                <div className="user-email__box">
                  <p className="user-email__title">Email</p>
                  <span className="user-email__logged-email">
                    {this.props.user.email}
                  </span>
                </div>
                <div className="edit-user-info__icon">
                  <i className="fa fa-pencil edit-user-info"
                    onClick={this.editEmail} />
                </div>
              </div>
              <div
                className="hidden"
                ref={(el) => {
                  this.fieldEmail = el;
                }
                }>
                <Field
                  name="E-mail"
                  className="hidden"
                  type="text"
                  text={'Enter your new e-mail'}
                  ref={(input) => {
                    this.email = input;
                  }}
                  value={this.props.user.email}
                  validations="isEmail"
                  validationError="Email is not valid"
                />
              </div>
            </div>
          </section>
          <div className="signup-field-group signup-btn-group edit">
            <input
              type="submit"
              disabled={!this.state.canSubmit}
              className="btn btn--signup btn--signup-active edit"
              value="Submit" />
              <Link to={'/'} className="btn btn--primary exit--editing">
              Cancel
            </Link>
          </div>
        </Formsy.Form>
      </div>
    );
  }
}

function mapStateToProps (store) {
  return {
    updateProfileStatus: store.users.updateProfileStatus,
    errorText: store.users.user.errorText,
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
  errorText: PropTypes.string,
  value: PropTypes.object,
  history: PropTypes.object
};
