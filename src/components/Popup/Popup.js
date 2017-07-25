import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';

export const Popup = (props) => {
  return (
    <div className="popup">
      <p className="popup-header">{props.header}</p>
      <p className="popup-text">{props.text}</p>
      <div className="popup-confirm">
        <button
          type="button"
          className="btn">
            Ok
        </button>
        <button
          type="button"
          className="btn btn--default">
            Cancel
        </button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string
};
