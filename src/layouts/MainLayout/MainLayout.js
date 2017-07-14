import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../../components/Navigation/Navigation';
import Header from '../../components/Header/Header';
import './MainLayout.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DeviceList from '../../pages/DeviceList/DeviceList';
import DevicePage from '../../pages/DevicePage/DevicePage';
import Builder from '../../pages/Builder/Builder';
import Dashboard from '../../pages/Dashboard/Dashboard';

export default class MainLayout extends Component {
  render () {
    return (
      <div>
        <Header />
        <Navigation />
        <main className="content">
          <Switch>
            <Route exact path='/' component = { Dashboard } />
            <Route path='/devices/device/:id' component={DevicePage} />
            <Route path='/devices' component={DeviceList} />
            <Route path='/builder' component={Builder} />
          </Switch>
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object
};
