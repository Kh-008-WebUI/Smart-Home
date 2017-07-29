import React from 'react';
import { connect } from 'react-redux';
import { Device } from '../../components/Device/Device';
import { Message } from '../../components/Message/Message';
import PropTypes from 'prop-types';
import {
  changeStatus,
  loadDeviceAsync,
  loadDevice,
  listSetItemValue,
  updateDevice } from '../../actions/devices.action';
import { sendNotificationWS } from '../../actions/notifications.action';
require('./DevicePage.scss');

class DevicePage extends React.Component {
  constructor (props) {
    super(props);

    this.changeStatus = (status, id) => {
      this.props.onStatusChange({ status }, id);
      this.props.sendNotificationWS(`${this.props.device.name} is
                                     ${status ? 'on' : 'off'}`);
    };
  }
  componentDidUpdate () {
    if (this.props.status === 'FAIL') {
      setTimeout(()=>{
        this.props.history.push('/devices');
      }, 1000);
    }
  }
  componentDidMount () {
    this.props.loadDevice(this.props.match.params.id);
    if (typeof this.props.device._id === 'undefined') {
      this.props.loadDeviceAsync(this.props.match.params.id);
    }
  }

  render () {
    const id = this.props.match.params.id;

    return (
      <div>
        {typeof this.props.device._id === 'undefined' ?
          <Message status={this.props.status}/> :
        <div className="device-view">
        <Device
            device={this.props.device}
            setItemValue={this.props.setItemValue}
            onStatusChange={this.changeStatus}/>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  device: state.devicesList.device,
  loadFailed: state.devicesList.loadFailed,
  status: state.devicesList.uploadStatus
});

const mapDispatchToProps = dispatch => ({
  loadDeviceAsync: (id) => dispatch(loadDeviceAsync(id)),
  loadDevice: (id) => dispatch(loadDevice(id)),
  setItemValue: (value, id) => dispatch(listSetItemValue(value, id)),
  onStatusChange: (data, id) => dispatch(updateDevice(data, id)),
  sendNotificationWS: (message) => dispatch(sendNotificationWS(message))
});

DevicePage.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
  _id: PropTypes.string,
  device: PropTypes.any,
  filter: PropTypes.array,
  filterAction: PropTypes.func,
  findItems: PropTypes.func,
  onStatusChange: PropTypes.func,
  loadDeviceAsync: PropTypes.func,
  loadDevice: PropTypes.func,
  setItemValue: PropTypes.func,
  pending: PropTypes.bool,
  loadFailed: PropTypes.bool,
  history: PropTypes.object,
  status: PropTypes.string,
  sendNotificationWS: PropTypes.func
};

DevicePage.defaultProps = {
  device: {
    items: []
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicePage);
