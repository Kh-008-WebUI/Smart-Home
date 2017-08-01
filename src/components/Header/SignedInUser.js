import React from 'react';
import './SignedInUser.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class SignedInUser extends React.Component {

  render () {
    return (
      <NavLink to="/user">
        <div className="user-block">
          <div className="user-name">{this.props.user.email}</div>
          <div className="user-photo"></div>
        </div>
      </NavLink>
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
