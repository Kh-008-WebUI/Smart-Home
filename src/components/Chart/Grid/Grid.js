import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Grid extends Component {
  componentDidUpdate () {
    this.renderGrid();
  }
  componentDidMount () {
    this.renderGrid();
  }
  renderGrid () {
    const axisOrient = `axis${this.props.orient}`;
    const axis = d3[axisOrient](this.props.scale)
      .ticks(this.props.ticks)
      .tickSize(-this.props.len, 0, 0)
      .tickFormat('');

    d3.select(this.gridElement).call(axis);
  }
  render () {
    const translate = `translate(0,${this.props.h})`;

    return (
      <g className = 'grid'
        ref={(el) => {
          this.gridElement = el;
        }}
         transform = {this.props.gridType === 'x' ? translate : ''}>
      </g>
    );
  }
}

Grid.propTypes = {
  h: PropTypes.number,
  orient: PropTypes.oneOf(['Left', 'Bottom', 'Right', 'Top']),
  scale: PropTypes.func,
  gridType: PropTypes.oneOf(['x', 'y']),
  ticks: PropTypes.number,
  len: PropTypes.number
};
