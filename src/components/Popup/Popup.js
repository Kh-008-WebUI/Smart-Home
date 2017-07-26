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
        <button
          onClick={() => {
            props.setPopupShown();
            props.okHandler();
          }}
          type="button"
          className="btn  popup__btn">
            Ok
        </button>
        <button
          onClick={props.setPopupShown}
          type="button"
          className="btn btn--default popup__btn">
            Cancel
        </button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
  setPopupShown: PropTypes.func,
  popupShown: PropTypes.bool,
  okHandler: PropTypes.func
};
