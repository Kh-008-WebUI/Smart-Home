import React from 'react';
import ListDevices from
'../../components/DashboardContent/ListDevices';
import ListUsers from
'../../components/DashboardContent/ListUsers';
import './Dashboard.scss';
import DashChart from '../../components/DashboardContent/DashChart';
import Chat from '../../components/Chat/Chat';

const Dashboard = () => (
  <div className="dashboard-block clearfix">
    <div className="dashboard-main">
      <ListDevices />
      <DashChart />
    </div>
    <div className="dashboard-sidebar">
      <ListUsers />
      <Chat />
    </div>
  </div>
);

export default Dashboard;
