import React from 'react';
import './SignedInUser.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class SignedInUser extends React.Component {

  render () {
    return (
      <div>
        <div className="user-block">
          <div className="user-block-name">{this.props.user.email}</div>
          <div className="user-block-photo">
            <img className="user-block-avatar"
            src={this.props.user.avatar} /></div>
          <div className="user-block-dropdown-content">
            <NavLink to="/user"
            className="user-block-dropdown-content-item">Profile</NavLink>
            <NavLink to="/auth"
            className="user-block-dropdown-content-item">Log out</NavLink>
          </div>
        </div>
      </div>
    );
  }
}
SignedInUser.propTypes = {
  user: PropTypes.object
};

function mapStateToProps (store) {
  return {
    user: store.users.user
  };
}

export default connect(mapStateToProps)(SignedInUser);
