import React from 'react';
import PropTypes from 'prop-types';

export default class AsyncComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      Component: null
    };
  }

  componentWillMount () {
    if (!this.state.Component) {
      this.props.getComponent()
        .then(сomponent => {
          this.setState({
            Component: сomponent.default
          });
        });
    }
  }

  render () {
    const { Component } = this.state;

    return !Component ? null : <Component {...this.props}/>;
  }
}

AsyncComponent.propTypes = {
  getComponent: PropTypes.func
};
