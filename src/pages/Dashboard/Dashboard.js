import React from 'react';
import ListDevices from
'../../components/DashboardContent/ListDevices';
import DashboardListUsers from
'../../components/DashboardContent/ListUsers';
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
      </div>
    );
  }
}

export default Dashboard;

