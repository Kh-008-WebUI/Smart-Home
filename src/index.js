require('./scss/index.scss');
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Builder from './pages/Builder/Builder.js';
import List from './pages//List/List.js';
import Dashboard from './pages/Dashboard/Dashboard.js';

render(
  <Router>
    <MainLayout>
      <Route exact path='/' component={Dashboard} />
      <Route path='/device-builder' component={Builder} />
    </MainLayout>
  </Router>,
  document.getElementById('root')
);
