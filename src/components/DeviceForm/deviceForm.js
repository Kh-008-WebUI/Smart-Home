import './deviceForm.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import {
  addDevice,
  addItem,
  setValue,
  resetProto
} from '../../actions/builder.action';
import { connect } from 'react-redux';
import Formsy, { HOC } from 'formsy-react';
import Field from '../Auth/Field/Field';
import { setItemDefaultData } from '../../utils/utils';
import { sendNotificationWS } from '../../actions/notifications.action';

const itemsToChoose = [
  'Toggle',
  'Timer',
  'LineChart',
  'Value',
  'Range'
];

const locationOptions = [
  { value: 'living room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'hallway', label: 'Hallway' }
];

class DeviceForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      items: []
    };
  }

  addItem = (e) => {
    const newItem = {
      name: e.target.value
    };

    setItemDefaultData(newItem);
    this.props.addItem(newItem);
  };

  createButton = (label, index) => {
    return (<input
      key={ index }
      type="button"
      className="form-button"
      onClick={ this.addItem }
      value={ label } />
    );
  };

  createButtons () {
    return itemsToChoose.map(this.createButton);
  }

  handleUserInput = () => {
    this.props.setValue('name', this.name.getValue());
  };

  handleSelectLocation = (val) => {
    const selectedValue = val.value;

    this.props.setValue('location', selectedValue);
  };

  handleSubmit = () => {
    this.props.sendNotificationWS(`${this.props.settings.name} was created`);

    this.props.addDevice(this.props.settings);
  };

  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  };
  disableButton = () => {
    this.setState({
      canSubmit: false
    });
  };
  render () {
    return (
      <Formsy.Form
        onSubmit={this.handleSubmit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onChange={ this.handleUserInput }
        className="device-form">
        <Field
          name="Device name"
          type="text"
          ref={(input) => {
            this.name = input;
          }}
          text={'Please enter device name'}
          validations="isAlphanumeric"
          validationError="This is not a valid name"
          required />
        <div className="input-container">
         <label>Location:</label> <br />
          <Select
            name="location"
            required
            placeholder="select location"
            options={ locationOptions }
            onChange={ this.handleSelectLocation }
            value={ this.props.settings.location }
          />
        </div>
        <div>
          <label> Device config:</label> <br />
          { this.createButtons() }
        </div>
        <div className="main-button-wrap signup-field-group signup-btn-group">
          <input className="btn btn--primary btn--signup btn--signup-active"
            type="submit"
            value="Add Device"
            disabled = {
              !this.state.canSubmit ||
              this.props.status === 'PENDING'
            } />
        </div>
        </Formsy.Form>
    );
  }
}
function mapStateToProps (store) {
  return {
    settings: store.builder.device,
    status: store.builder.uploadStatus
  };
}
function mapDispatchToProps (dispatch) {
  return {
    setValue: bindActionCreators(setValue, dispatch),
    addItem:  bindActionCreators(addItem, dispatch),
    resetProto: bindActionCreators(resetProto, dispatch),
    addDevice: bindActionCreators(addDevice, dispatch),
    sendNotificationWS: (message) => dispatch(sendNotificationWS(message))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DeviceForm);

DeviceForm.propTypes = {
  setValue: PropTypes.func,
  addItem: PropTypes.func,
  resetProto: PropTypes.func,
  addDevice:  PropTypes.func,
  settings: PropTypes.object,
  status: PropTypes.string,
  sendNotificationWS: PropTypes.func
};
