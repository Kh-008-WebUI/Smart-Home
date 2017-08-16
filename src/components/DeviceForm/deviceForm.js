import './deviceForm.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import {
  addDevice,
  addItem,
  setValue,
  resetProto,
  loadLocations,
  addLocation,
  deleteLocation,
  devicesInLocation
} from '../../actions/builder.action';
import { connect } from 'react-redux';
import Formsy, { HOC } from 'formsy-react';
import Field from '../Auth/Field/Field';
import SelectLocation from '../SelectLocation/SelectLocation';
import { setItemDefaultData } from '../../utils/utils';
import { sendNotificationWS } from '../../actions/notifications.action';
import { updateDevice } from '../../actions/devices.action';

const itemsToChoose = [
  'Toggle',
  'Timer',
  'LineChart',
  'Value',
  'Range'
];

class DeviceForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount () {
    this.props.loadLocations();
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

  selectLocation = (value) => {
    this.props.setValue('location', value);
  };

  handleSubmit = () => {
    if (typeof this.props.settings._id !== 'undefined') {
      this.props.updateDevice(this.props.settings, this.props.settings._id);
    } else {
      this.props.addDevice(this.props.settings);
    }
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
    let defaultLocation;

    if (!this.props.settings.location && this.props.locations[0]) {
      defaultLocation = this.props.locations[0].label;
    } else {
      defaultLocation = this.props.settings.location;
    }

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
          validations={{
            matchRegexp: /[\w\d\s]+/
          }}
          validationError="This is not a valid name"
          required
          value={this.props.settings.name} />
        <div className="input-container">
          <label>Location:</label>
            <SelectLocation
              selectLocation={this.selectLocation}
              locations={this.props.locations}
              addLocation={this.props.addLocation}
              deleteLocation={this.props.deleteLocation}
              defaultLocation={defaultLocation}
              deviceExistInLocation={this.props.deviceExistInLocation}
              deviceInLocation={this.props.deviceInLocation}
              />
        </div>
        <div>
          <label> Device config:</label>
          { this.createButtons() }
        </div>
        <div className="main-button-wrap signup-field-group signup-btn-group">
          <input className="btn btn--primary btn--signup btn--signup-active"
            type="submit"
            value="Save"
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
    status: store.builder.uploadStatus,
    locations: store.builder.locations,
    deviceInLocation: store.builder.deviceInLocation
  };
}
function mapDispatchToProps (dispatch) {
  return {
    setValue: bindActionCreators(setValue, dispatch),
    addItem:  bindActionCreators(addItem, dispatch),
    resetProto: bindActionCreators(resetProto, dispatch),
    addDevice: bindActionCreators(addDevice, dispatch),
    updateDevice: (data, id) => dispatch(updateDevice(data, id)),
    loadLocations: () => dispatch(loadLocations()),
    addLocation: (location) => dispatch(addLocation(location)),
    deleteLocation: (id) => dispatch(deleteLocation(id)),
    deviceExistInLocation: (id) => dispatch(devicesInLocation(id))
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
  updateDevice: PropTypes.func,
  loadLocations: PropTypes.func,
  locations: PropTypes.array,
  addLocation: PropTypes.func,
  deleteLocation: PropTypes.func,
  deviceInLocation: PropTypes.bool,
  deviceExistInLocation: PropTypes.func
};
