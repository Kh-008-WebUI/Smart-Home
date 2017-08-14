import React from 'react';

export default (getComponent) => (
  class AsyncComponent extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        Component: null
      };
    }

    componentWillMount () {
      if (!this.state.Component) {
        getComponent()
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
);
