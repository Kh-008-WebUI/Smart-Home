import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ToggleSettings from '../ToggleSettings/ToggleSettings';
require('./DeviceListItem.scss');

class DeviceListItem extends React.Component {
  constructor (props) {
    super(props);

    this.setDeviceId = (e) =>{
      this.props.setPopupShown(this.props.data._id);
    };
  }

  render () {
    return (
      <div className="device-item">
        <div className="device-item__info">
          <Link className="device-item__info-name" to={
            `/devices/device/${this.props.data._id}`
          }>
            {this.props.data.name}
          </Link>
          <div className="device-item__info-status">
            <ToggleSettings
              checked={this.props.data.status}
              itemId={this.props.data._id}
              setItemValue={this.props.changeStatus}/>
          </div>
        </div>
        <div className="device-item__description">
            <div className="device-item__description-location">
              {this.props.data.location}</div>
            <div className="device-item__description-icon">
              <div className="device-item__description-icon-delete">
                <a className="fa fa-trash"
                    onClick={this.setDeviceId}>
                </a>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

DeviceListItem.propTypes = {
  changeStatus: PropTypes.func,
  deleteDevice: PropTypes.func,
  setPopupShown: PropTypes.func,
  data: PropTypes.shape({
    status: PropTypes.boolean,
    _id: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string
  })
};

export default DeviceListItem;
