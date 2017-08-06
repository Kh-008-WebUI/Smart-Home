import React from 'react';
import './SignedInUser.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/auth.action';

class SignedInUser extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      caret: 'fa-caret-down',
      dropDown: {
        right: -100,
        width: 100
      }
    };
  }

  showDropdown = () => {
    const caret = this.state.caret === 'fa-caret-down' ?
      'fa-caret-up' : 'fa-caret-down';
    const width = this.parentDiv.offsetWidth >= 100 ?
      this.parentDiv.offsetWidth : 100;
    const right = this.state.dropDown.right === 0 ?
      -width : 0;

    this.setState({
      caret,
      dropDown: {
        right,
        width
      }
    });
  }

  render () {
    return (
      <div>
        <div
          className="user-block"
          ref={ (element) => {
            this.parentDiv = element;
          } }
          onClick={this.showDropdown}>
          <div className="user-block-name">{this.props.user.email}</div>
          <div className={this.props.user.avatar ?
            'user-block-avatar display-user' :
            'user-block-avatar'
            }>
            <img className="user-block-photo" src={this.props.user.avatar} />
          </div>
          <div className={this.props.user.avatar ?
            'user-block-avatar' :
            'user-block-avatar display-user'
            }>
            <i className="fa fa-user-circle-o icon" aria-hidden="true"></i>
          </div>
          <i className={ `fa ${ this.state.caret }` } aria-hidden="true"></i>
          <div
            className={ `user-block-dropdown-content ${ this.state.show }` }
            style={ this.state.dropDown } >
            <NavLink
              to="/user"
              className="user-block-dropdown-content-item">Profile</NavLink>
            <NavLink
              to="/auth"
              onClick={(e) => {
                e.preventDefault();
                this.props.logout();
              }}
              className="user-block-dropdown-content-item">Log out</NavLink>
          </div>
        </div>
      </div>
    );
  }
}
SignedInUser.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func
};

function mapStateToProps (store) {
  return {
    user: store.users.user
  };
}
function mapDispatchToProps (dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignedInUser);
