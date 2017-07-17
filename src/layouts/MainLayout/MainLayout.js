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
import { connect } from 'react-redux';

class MainLayout extends Component {
  componentDidMount () {
    if (!this.props.isLogged) {
      this.props.history.push('/auth');
    }
  }
  componentDidUpdate () {
    if (!this.props.isLogged) {
      this.props.history.push('/auth');
    }
  }
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
function mapStateToProps (store) {
  return {
    isLogged: store.authentication.isLogged
  };
}

MainLayout.propTypes = {
  isLogged: PropTypes.bool,
  history: PropTypes.object
};
export default connect(mapStateToProps)(MainLayout);
