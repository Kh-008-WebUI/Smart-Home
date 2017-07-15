import React from 'react';
import { connect } from 'react-redux';
import { Device } from '../../components/Device/Device';
import PropTypes from 'prop-types';
import {
  changeStatus,
  loadDeviceAsync,
  listSetItemValue } from '../../actions/devices.action';
require('./DevicePage.scss');

class DevicePage extends React.Component {
  constructor (props) {
    super(props);
    this.props.loadDevice(parseInt(this.props.match.params.id));
  }

  render () {
    const id = parseInt(this.props.match.params.id);
    const device = this.props.devices.filter(item =>
      item.id === id)[0];

    return (
      <div className="device-view">
        {this.props.devices.length === 0 ? <p>
            <i className="fa fa-3x fa-spinner fa-spin"></i>
          </p> : <Device
            device={device}
            setItemValue={this.props.setItemValue}
            onStatusChange={this.props.onStatusChange}/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  devices: state.devicesList
});

const mapDispatchToProps = dispatch => ({
  loadDevice: (id) => dispatch(loadDeviceAsync(id)),
  setItemValue: (value, id) => dispatch(listSetItemValue(value, id)),
  onStatusChange: (id) => dispatch(changeStatus(id))
});

DevicePage.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
  devices: PropTypes.array,
  filter: PropTypes.array,
  filterAction: PropTypes.func,
  findItems: PropTypes.func,
  onStatusChange: PropTypes.func,
  loadDevice: PropTypes.func,
  setItemValue: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicePage);
