import React from 'react';
import ListDevices from
'../../components/DashboardContent/ListDevices';
import ListUsers from
'../../components/DashboardContent/ListUsers';
import './Dashboard.scss';

const Dashboard = () => (
  <div className='dashboard-block'>
    <div className='dashboard-devices-and-persons'>
      <ListDevices />
      <ListUsers />
    </div>
  </div>
);

export default Dashboard;
