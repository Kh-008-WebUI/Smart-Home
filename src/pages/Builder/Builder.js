import React, { Component } from 'react';
import './builder.scss';
import DeviceForm from '../../components/DeviceForm/deviceForm.js';
import Prototype from '../../components/Prototype/Prototype.js';
import Message from '../../components/Message/Message.js';
import PropTypes from 'prop-types';

export const Builder = (props) => (
      <section className='builder'>
        <h1 className='device-list__title'>Device Builder</h1>
        <DeviceForm />
        <Message router={props.history}/>
        <h3 className="builder__title">Prototype</h3>
        <Prototype />
      </section>
);

Builder.propTypes = {
  history: PropTypes.object
};
