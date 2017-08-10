import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';
import NotificationsBell from '../DashboardContent/NotificationsBell.js';
import SignedInUser from './SignedInUser';

export default class Header extends React.Component {
  render () {
    return (
      <header className="main-header">
        <div className={ this.props.open ?
            'main-header__nav main-header__nav--shown' :
            'main-header__nav'}>
          <div className="main-header__logo">
            <Link to="/">
              smart home
            </Link>
          </div>
          <button
            className="main-header__navicon"
            onClick={this.props.setSidebarOpen}>
            <i
              className="fa fa-bars main-header__navicon-bars"
              aria-hidden="true"></i>
          </button>
        </div>
        <div className="main-header__personal">
          <NotificationsBell />
          <SignedInUser />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  open: PropTypes.bool,
  setSidebarOpen: PropTypes.func
};
