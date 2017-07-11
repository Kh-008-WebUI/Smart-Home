import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ToggleSettings from '../ToggleSettings/ToggleSettings';
require('./DeviceListItem.scss');

class DeviceListItem extends React.Component {
  constructor (props) {
    super(props);

    this.onStatusChange = (e) => {
      this.props.changeStatus(this.props.data.id);
    };
    this.deleteDevice = (e) =>{
      this.props.deleteDevice(this.props.data.id);
    };
  }

  render () {
    return (
      <div className='device-item'>
        <div className='device-item__info'>
          <Link className='device-item__info-name' to={
            `/devices/device/${this.props.data.id}`
          }>
            {this.props.data.name}
          </Link>
          <div className="device-item__info-status">
            <ToggleSettings
              id={this.props.data.id}
              checked={this.props.data.status}
              onStatusChange={this.onStatusChange}/>
          </div>
        </div>
        <div className="device-item__description">
            <div className="device-item__description-location">
              {this.props.data.location}</div>
            <div className="device-item__description-icon">
              <div className="device-item__description-icon-delete">
                <a className="fa fa-trash"
                    onClick={this.deleteDevice}></a></div>
            </div>
        </div>
      </div>
    );
  }
}

DeviceListItem.propTypes = {
  changeStatus: PropTypes.func,
  deleteDevice: PropTypes.func,
  data: PropTypes.shape({
    status: PropTypes.boolean,
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.string
  })
};

export default DeviceListItem;
