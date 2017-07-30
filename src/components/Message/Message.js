import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { Popup } from '../Popup/Popup';
import { Button } from '../Button/Button';

export const Message = (props) => {
  const chooseMessage = () => {
    switch (props.status) {
      case 'PENDING':
        return (<i className="fa fa-3x fa-spinner fa-spin"></i>);
      case 'DONE':
        return (<i className="fa fa-check fa-3x"></i>);
      case 'FAIL':
        return (
          <Popup
            popupShown={props.popupShown}
            header={props.header}
            text={props.text}
          >
            <Button
              okHandler={() => {
                props.setPopupShown();
                props.clearLoginStatus();
              }}
              className={'btn popup__btn'}
              innerText={'Ok'}
            />
          </Popup>
        );
      default:
        return '';
    }
  };

  return (
    <div className='Message'>
      {chooseMessage()}
    </div>
  );
};

Message.propTypes = {
  status: PropTypes.string,
  header: PropTypes.string,
  text: PropTypes.string,
  popupShown: PropTypes.bool,
  setPopupShown: PropTypes.func,
  clearLoginStatus: PropTypes.func
};
