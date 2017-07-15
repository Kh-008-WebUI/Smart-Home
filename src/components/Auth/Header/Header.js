import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const Header = (props) => (
  <div className="signup-header">
    <i
      className={ `fa ${ props.pic } fa-3x signup-header__icon` }
      aria-hidden="true">
    </i>
    <h1 className="signup-header__title">{ props.title }
      <span className="caption signup-header__caption">
        { props.text }
      </span>
    </h1>
  </div>
);

Header.propTypes = {
  pic: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
};
