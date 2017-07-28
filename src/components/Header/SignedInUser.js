import React from 'react';
import './SignedInUser.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class SignedInUser extends React.Component {

  render () {
    return (
      <NavLink to="/auth/user-profile">
        <div className="user-block">
          <div className="user-name">{this.props.userData}</div>
          <div className="user-photo"></div>
        </div>
      </NavLink>
    );
  }
}
SignedInUser.propTypes = {
  userData: PropTypes.string
};

function mapStateToProps (store) {
  return {
    userData: store.authentication.isLogged.name
  };
}

export default connect(mapStateToProps)(SignedInUser);
