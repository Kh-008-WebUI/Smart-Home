import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import NotificationsBell from '../DashboardContent/NotificationsBell.js';
import SignedInUser from './SignedInUser';

export default class Header extends React.Component {

  render () {
    return (
      <header className="header-block">
        <div className="header-blok-left">
          <div className="header-block-text">smart home</div>
          <button
            className="header-block__navicon"
            onClick={this.props.setSidebarOpen}>
            <i
              className="fa fa-bars header-block__navicon-bars"
              aria-hidden="true"></i>
          </button>
        </div>
        <div className="header-blok-right">
            <NotificationsBell />
            <SignedInUser />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  setSidebarOpen: PropTypes.func
};
