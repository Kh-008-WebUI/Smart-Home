import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './DeviceContent.scss';

const DeviceContent = (props) => {
  return (
    <Link to={
      `/devices/device/${props.device.id}`
      }>
    <div className="device-item">
        <div className="device-item__info device-item-name_and_power">
          <div className="device-item__info-name">
            {props.device.name}
          </div>
          <div className={
            props.device.status ?
             'device-on_off power-on' :
             'device-on_off power-off'
            }>
          </div>
        </div>
        <div className="device-item__description">
            <div className="device-item__description-location">
              {props.device.location}</div>
        </div>
      </div>
    </Link>
  );
};

DeviceContent.propTypes = {
  device: PropTypes.object,
  power: PropTypes.string
};
export default DeviceContent;


