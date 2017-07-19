import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import NotificationsBell from '../DashboardContent/NotificationsBell.js';

export default class Header extends React.Component {

  render () {
    return (
      <header className="header-block">
        <div className="header-block-text">smart home</div>
        <button
          className="header-block__navicon"
          onClick={this.props.toggleClass}>
          <i
            className="fa fa-bars header-block__navicon-bars"
            aria-hidden="true"></i>
        </button>
        <div className="notification-block">
         <NotificationsBell />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  toggleClass: PropTypes.func
};
