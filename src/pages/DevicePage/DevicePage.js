import React from 'react';
import { connect } from 'react-redux';
import { Device } from '../../components/Device/Device';
import PropTypes from 'prop-types';
import {
  changeStatus,
  loadDeviceAsync } from '../../actions/devices.action';
require('./DevicePage.scss');

class DevicePage extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.loadDevice(parseInt(this.props.match.params.id));
  }

  render () {
    const id = parseInt(this.props.match.params.id);

    return (
      <div className="device-view">
      <Device
            device={this.props.device}
            onStatusChange={this.props.onStatusChange}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  devices: state.devicesList
});

const mapDispatchToProps = dispatch => ({
  loadDevice: (id) => dispatch(loadDeviceAsync(id)),
  onStatusChange: (id) => dispatch(changeStatus(id))
});

DevicePage.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
  device: PropTypes.object,
  filter: PropTypes.array,
  filterAction: PropTypes.func,
  findItems: PropTypes.func,
  onStatusChange: PropTypes.func,
  loadDevice: PropTypes.func
};

DevicePage.defaultProps = {
  device: {
    items: []
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicePage);
