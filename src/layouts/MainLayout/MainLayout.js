import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../../components/Navigation/Navigation';
import Header from '../../components/Header/Header';
import './MainLayout.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

class MainLayout extends Component {
  constructor (props) {
    super(props);

    this.toggleClass = () => {
      const menu = document.querySelector('.navigation');

      menu.classList.toggle('navigation--shown');
    };
  }
  componentWillMount () {
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
        <Header toggleClass={this.toggleClass}/>
        <Navigation />
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

MainLayout.propTypes = {
  isLogged: PropTypes.bool,
  history: PropTypes.object,
  children: PropTypes.any
};
export default connect(mapStateToProps)(MainLayout);
