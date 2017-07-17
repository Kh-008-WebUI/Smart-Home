import React from 'react';
import { settingsComponents } from '../../data/componentsNames';
import DeviceStatusToggle from '../DeviceStatusToggle/DeviceStatusToggle';
import PropTypes from 'prop-types';
require('./Device.scss');

export const Device = (props) => {
  const device = props.device;

  return (
    <seciton>
      <div className="device-view__header">
        <div className="device-view__name">
          <h3>{device.name}</h3>
          <small>Last updated 7 days ago</small>
        </div>
        <div className="device-item__info-status">
          <DeviceStatusToggle
            device={props.device}
            changeStatus={props.onStatusChange}/>
        </div>
        <div className="device-view__info">
          <small>07.06.2017</small><br/>
          <small>User</small>
        </div>
      </div>
      <div className="device-view__location">
        <h4>
          <i className="fa fa-map-marker"></i>{device.location}
        </h4>
      </div>
      <section className="device-view__settings">
        {device.items.map((setting, i) => {
          const SettingsComponent = settingsComponents[setting.name];

          return (
            <div key={i} className="device-view__settings-description">
              <div>
                {setting.description}
              </div>
            <SettingsComponent
              key={'setting' + i}
              data={setting.data}
              checked={setting.data}
              setItemValue={props.setItemValue}
              itemId={i}
              styleName={
                'device-view__settings-item device-view__settings-item--'
                + setting.name.toLowerCase()
            }/>
            </div>
          );
        })}
      </section>
    </seciton>
  );
};

Device.propTypes = {
  device: PropTypes.any.isRequired,
  onStatusChange: PropTypes.func,
  setItemValue: PropTypes.func
};
