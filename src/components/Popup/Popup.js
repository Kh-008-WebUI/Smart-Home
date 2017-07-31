import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';

export const Popup = (props) => {
  return (
    <div className={props.popupShown ?
      'popup popup--shown' : 'popup'}>
      <p className="popup__header">{props.header}</p>
      <p className="popup__text">{props.text}</p>
      <div className="popup__confirm">
        {props.children}
      </div>
    </div>
  );
};

Popup.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
  setPopupShown: PropTypes.func,
  popupShown: PropTypes.bool,
  okHandler: PropTypes.func,
  children: PropTypes.any
};
