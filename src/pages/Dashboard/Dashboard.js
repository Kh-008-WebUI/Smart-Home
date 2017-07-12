import React from 'react';
import DashboardListDevices from
'../../components/DashboardContent/ListDevices';
import DashboardListUsers from
'../../components/DashboardContent/ListUsers';
import Notification from
'../../components/DashboardContent/Notification';
import jsonData from '../../data/data';
import './Dashboard.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import deviceList from '../../api/dashListDeviceApi.js';

class Dashboard extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
     <div className='dashboard-block'>
        <div className='dashboard-devices-and-persons'>
          <DashboardListDevices data={jsonData} />
          <DashboardListUsers />
        </div>
        <Notification/>
      </div>
    );
  }
}


Dashboard.propTypes = {
  devices: PropTypes.array
};

export default Dashboard;

