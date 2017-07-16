import React from 'react';
import PropTypes from 'prop-types';
import '../ToggleSettings/ToggleStyle.scss';

export default class DeviceStatusToggle extends React.Component {

  constructor (props) {
    super(props);
    this.changeStatus = this.changeStatus.bind(this);
    this.state = {
      checked: false
    };
  }

  componentDidMount () {
    this.setState({
      checked: this.props.device.status
    });
  }

  changeStatus () {
    this.props.changeStatus(this.props.device);

    this.setState({
      checked: !this.state.checked
    });
  }

  render () {
    return (
      <div>
        <label className="switch">
          <input
            type="checkbox"
            onChange={this.changeStatus}
            checked={this.state.checked}
          />
          <div className="slider round"></div>
        </label>
      </div>
    );
  }
}

DeviceStatusToggle.propTypes = {
  device: PropTypes.object,
  changeStatus: PropTypes.func
};
