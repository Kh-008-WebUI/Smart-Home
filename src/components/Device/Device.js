import React from 'react';
import { settingsComponents } from '../../data/componentsNames';
import ToggleSettings from '../ToggleSettings/ToggleSettings';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
require('./Device.scss');

export const Device = (props) => {
  const device = props.device;

  return (
    <seciton>
      <div className="device-view__header">
        <div className="device-view__name">
          <h1>{device.name}</h1>
          <small>Last updated {props.device.updetedDate}</small>
        </div>
        <div className="device-item__info-status">
          <ToggleSettings
            checked={props.device.status}
            itemId={props.device._id}
            setItemValue={props.onStatusChange}/>
        </div>
        <Link to={`/device/edit/${props.device._id}`}
          className="fa fa-pencil device-item_info-edit">
        </Link>
        <div className="device-view__info">
          <small>Date of create </small>
          <small>{props.device.createdDate}</small><br/>
          <small>Created by </small>
          <small>{props.device.createdBy}</small>
        </div>
      </div>
      <div className="device-view__location">
        <h4>
          <i className="fa fa-map-marker"></i>{device.location}
        </h4>
      </div>
      <section className="device-view__settings">
        {device.items.map((setting, i) => {
          const { minValue, maxValue } = setting.params;
          const SettingsComponent = settingsComponents[setting.name];

          console.log('in Device', setting.params);

          return (
            <div
              key={'setting' + i}
              className={'device-settings__group device-settings__group--'
                + setting.name.toLowerCase()}>
              <div className="device-settings__description">
                {setting.description || 'No Description yet'}
              </div>
            <SettingsComponent
              data={setting.data}
              checked={setting.data}
              params={setting.params}
              setItemValue={props.setItemValue}
              itemId={i}
              deviceId={props.device._id}
              styleName={
                'device-settings__item device-settings__item--'
                + setting.name.toLowerCase()
              }
              showMinMax={false}/>
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
  setItemValue: PropTypes.func,
  minValue: PropTypes.number,
  maxValue: PropTypes.number
};
