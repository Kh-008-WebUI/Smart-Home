import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.scss';
import { SettingsList } from '../SettingsList/SettingsList';
import { setItemValue } from '../../actions/builder.action';
import { bindActionCreators } from 'redux';

const Prototype = (props) => (
  <div className='Prototype'>
    <h3>{props.device.name}</h3>
    <SettingsList
      settings={props.device}
      deleteItem={props.deleteItem}
      setItemValue={props.setItemValue}
    />
  </div>
);

function mapStateToProps (store) {
  return {
    settings: store.builder.device
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setItemValue: bindActionCreators(setItemValue, dispatch)
  };
}

Prototype.propTypes = {
  device: PropTypes.object,
  deleteItem: PropTypes.func,
  setItemValue: PropTypes.func,
  settings: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Prototype);
