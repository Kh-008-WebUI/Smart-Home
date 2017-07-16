import React from 'react';
import { connect } from 'react-redux';
import { Device } from '../../components/Device/Device';
import PropTypes from 'prop-types';
import {
  changeStatus,
  loadDeviceAsync,
  loadDevice,
  listSetItemValue } from '../../actions/devices.action';
require('./DevicePage.scss');

class DevicePage extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.loadDevice(parseInt(this.props.match.params.id));
    if (typeof this.props.device.id === 'undefined') {
      this.props.loadDeviceAsync(parseInt(this.props.match.params.id));
    }
  }

  render () {
    const id = parseInt(this.props.match.params.id);

    return (
      <div>
        {typeof this.props.device.id === 'undefined' ?
          <p><i className="fa fa-3x fa-spinner fa-spin"></i></p> :
        <div className="device-view">
        <Device
            device={this.props.device}
            setItemValue={this.props.setItemValue}
            onStatusChange={this.props.onStatusChange}/>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  device: state.devicesList.device
});

const mapDispatchToProps = dispatch => ({
  loadDeviceAsync: (id) => dispatch(loadDeviceAsync(id)),
  loadDevice: (id) => dispatch(loadDevice(id)),
  setItemValue: (value, id) => dispatch(listSetItemValue(value, id)),
  onStatusChange: (device) => dispatch(changeStatus(device))
});

DevicePage.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
  device: PropTypes.any,
  filter: PropTypes.array,
  filterAction: PropTypes.func,
  findItems: PropTypes.func,
  onStatusChange: PropTypes.func,
  loadDeviceAsync: PropTypes.func,
  loadDevice: PropTypes.func,
  setItemValue: PropTypes.func
};

DevicePage.defaultProps = {
  device: {
    items: []
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicePage);
