import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../../components/Navigation/Navigation';
import Header from '../../components/Header/Header';
import './MainLayout.scss';

export default class MainLayout extends Component {
  render () {
    return (
      <div>
        <Header />
        <Navigation />
         {this.props.children}
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object
};

