import React from 'react';
import PropTypes from 'prop-types';
import { settingsComponents } from '../../data/componentsNames';
import { SettingsListItem } from
'../SettingsListItem/SettingsListItem';


export const SettingsList = (props) => (
  <div className="settings-block">
    {props.settings.items.map((setting, i) => {
      const Item = settingsComponents[setting.name];

      return (
        <SettingsListItem
          key={i}
          addDescription={props.addDescription}
          styleName={`settings-${setting.name.toLowerCase()}`}
          name={setting.name}
          deleteItem={props.deleteItem}
          id={i}>
          <Item />
        </SettingsListItem>
      );
    })}
  </div>
);

SettingsList.propTypes = {
  settings: PropTypes.object,
  width: PropTypes.number,
  addDescription: PropTypes.func,
  deleteItem: PropTypes.func
};
