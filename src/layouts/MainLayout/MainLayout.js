import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../../components/Navigation/Navigation';
import Header from '../../components/Header/Header';
import './MainLayout.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getLoggedUser,
  logout,
  clearLoginStatus } from '../../actions/auth.action';
import { Message } from '../../components/Message/Message';

class MainLayout extends Component {
  constructor (props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };

    this.setSidebarOpen = () => {
      const currentState = this.state.sidebarOpen;

      this.setState({ sidebarOpen: !currentState });
    };
  }
  componentWillMount () {

    // this.props.getLoggedUser();
  }
  componentDidUpdate () {
    if (!this.props.isLogged._id) {
      this.props.history.push('/auth');
    }
  }
  render () {
    return (
      <div>
        <Header setSidebarOpen={this.setSidebarOpen}/>
        <Navigation
          open={this.state.sidebarOpen}
          setSidebarOpen={this.setSidebarOpen}/>
        <main className="content">
        {this.props.children}
        <Message
          clearStatus={this.props.clearLoginStatus}
          status={this.props.status}
          header={'Error'}
          text={this.props.errorText}/>
        </main>
      </div>
    );
  }
}
function mapStateToProps (store) {
  return {
    isLogged: store.authentication.isLogged,
    errorText: store.authentication.errorText,
    status: store.authentication.status
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getLoggedUser: bindActionCreators(getLoggedUser, dispatch),
    clearLoginStatus: bindActionCreators(clearLoginStatus, dispatch)
  };
}

MainLayout.propTypes = {
  isLogged: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.any,
  getLoggedUser: PropTypes.func,
  errorText: PropTypes.string,
  status: PropTypes.string,
  clearLoginStatus: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
