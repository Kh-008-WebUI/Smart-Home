import React from 'react';
import ListDevices from
'../../components/DashboardContent/ListDevices';
import DashboardListUsers from
'../../components/DashboardContent/ListUsers';
import './Dashboard.scss';

const Dashboard = () => (
  <div className='dashboard-block'>
    <div className='dashboard-devices-and-persons'>
      <ListDevices />
      <DashboardListUsers />
    </div>
  </div>
);

export default Dashboard;
