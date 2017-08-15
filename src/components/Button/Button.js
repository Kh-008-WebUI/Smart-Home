import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const Button = (props) => {
  return (
    <button
      type="button"
      disabled={props.disabled}
      className={props.className}
      onClick={() => {
        props.okHandler();
      }}>
        {props.innerText}
    </button>
  );
};

Button.propTypes = {
  innerText: PropTypes.string,
  className: PropTypes.string,
  setPopupShown: PropTypes.func,
  okHandler: PropTypes.func,
  disabled: PropTypes.bool
};
