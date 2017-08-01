import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../../components/Navigation/Navigation';
import Header from '../../components/Header/Header';
import './MainLayout.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLoggedUser } from '../../actions/auth.action';

class MainLayout extends Component {
  constructor (props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };

    this.setSidebarOpen = (open) => {
      const currentState = this.state.sidebarOpen;

      this.setState({ sidebarOpen: !currentState });
    };
  }
  componentWillMount () {
    this.props.getLoggedUser();
    if (!this.props.isLogged._id) {
      this.props.history.push('/auth');
    }
  }
  render () {
    return (
      <div>
        <Header setSidebarOpen={this.setSidebarOpen}/>
        <Navigation open={this.state.sidebarOpen}/>
        <main className="content">
        {this.props.children}
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

function mapDispatchToProps (dispatch) {
  return {
    getLoggedUser: bindActionCreators(getLoggedUser, dispatch)
  };
}

MainLayout.propTypes = {
  isLogged: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.any,
  getLoggedUser: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
