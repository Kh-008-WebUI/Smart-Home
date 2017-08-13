import React, { Component } from 'react';

export default (getComponent) => (
  class AsyncComponent extends Component {
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
      const { Сomponent } = this.state;

      return !Сomponent ? null : React.createElement(Component);
    }
  }
);
