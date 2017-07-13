import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Axis extends Component {
  componentDidUpdate () {
    this.renderAxis();
  }
  componentDidMount () {
    this.renderAxis();
  }
  renderAxis () {
    const axisOrient = `axis${this.props.orient}`;
    let axis = d3[axisOrient](this.props.scale)
          .ticks(this.props.ticks);

    if (this.props.format) {
      axis = axis.tickFormat(d3.timeFormat(this.props.format));
    }

    d3.select(this.axisElement).call(axis);
  }
  render () {
    const translate = `translate(0,${this.props.h})`;

    return (
      <g className = "axis"
        ref={(el) => {
          this.axisElement = el;
        }}
        transform = {this.props.axisType === 'x' ? translate : ''} >
      </g>
    );
  }
}

Axis.propTypes = {
  h: PropTypes.number,
  orient: PropTypes.oneOf(['Left', 'Bottom', 'Right', 'Top']),
  scale: PropTypes.func,
  axisType: PropTypes.oneOf(['x', 'y']),
  ticks: PropTypes.number,
  format: PropTypes.string
};
