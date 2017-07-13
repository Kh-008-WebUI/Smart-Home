import React from 'react';
import ListDevices from
'../../components/DashboardContent/ListDevices';
import DashboardListUsers from
'../../components/DashboardContent/ListUsers';
import Notification from
'../../components/DashboardContent/Notification';
import './Dashboard.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
     <div className='dashboard-block'>
        <div className='dashboard-devices-and-persons'>
          <ListDevices />
          <DashboardListUsers />
        </div>
        <Notification/>
      </div>
    );
  }
}

export default Dashboard;

