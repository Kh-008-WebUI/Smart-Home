import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const Dots = (props) => (
  <g>
    {props.data.map((d, i)=>(
      <circle className="dot" r="5" cx={props.x(d.date)}
              cy= {props.y(d[props.yData])} key={i} />))}
  </g>
);

Dots.propTypes = {
  data: PropTypes.array,
  yData: PropTypes.string,
  x: PropTypes.func,
  y: PropTypes.func
};
