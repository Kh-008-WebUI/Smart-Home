import React from 'react';
import './Header.scss';
import NotificationsBell from '../DashboardContent/NotificationsBell.js';

export default class Header extends React.Component {

  render () {
    return (
      <header className="header-block">
        <div className="header-block-text">smart home</div>
        <div className="notification-block">
         <NotificationsBell />
        </div>
      </header>
    );
  }
}
