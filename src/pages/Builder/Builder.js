import React, { Component } from 'react';
import DeviceForm from '../../components/DeviceForm/deviceForm.js';
import Prototype from '../../components/Prototype/Prototype.js';
import Message from '../../components/Message/Message.js';
import PropTypes from 'prop-types';

export const Builder = (props) => (
      <div className='builder'>
        <DeviceForm />
        <Message router={props.history}/>
        <Prototype />
      </div>
);

Builder.propTypes = {
  history: PropTypes.object
};
