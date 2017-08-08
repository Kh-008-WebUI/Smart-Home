import React from 'react';
import ListDevices from
'../../components/DashboardContent/ListDevices';
import ListUsers from
'../../components/DashboardContent/ListUsers';
import './Dashboard.scss';
import DashChart from '../../components/DashboardContent/DashChart';

const Dashboard = () => (
  <div className="dashboard-block clearfix">
    <div className="col-xs-8">
      <ListDevices />
      <DashChart />
    </div>
    <div className="col-xs-4">
      <ListUsers />
    </div>
  </div>
);

export default Dashboard;
