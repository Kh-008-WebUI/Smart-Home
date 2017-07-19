import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export const Message = (props) => {
  const chooseMessage = () => {
    switch (props.status) {
      case 'PENDING':
        return (<i className="fa fa-3x fa-spinner fa-spin"></i>);
      case 'DONE':
        return (<i className="fa fa-check fa-3x"></i>);
      case 'FAIL':
        return (<i className="fa fa-times fa-3x"></i>);
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
  status: PropTypes.string
};
