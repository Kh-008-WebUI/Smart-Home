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
          <small>07.07.17</small><br/>
          <small>username</small>
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
            <div
              key={'setting' + i}
              className={'device-settings__group device-settings__group--'
                + setting.name.toLowerCase()}>
              <div className="device-settings__description">
                {setting.description}
              </div>
            <SettingsComponent
              data={setting.data}
              checked={setting.data}
              setItemValue={props.setItemValue}
              itemId={i}
              styleName={
                'device-settings__item device-settings__item--'
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
