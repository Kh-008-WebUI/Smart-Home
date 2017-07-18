import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

export const SettingsListItem = (props) => (
  <div className={ `settings ${ props.styleName }` }>
    <div className="item-header">
      <p className="item-header__name">{props.name}</p>
      <button
        className="item-header__delete-btn"
        onClick={()=>props.deleteItem(props.id)}
      />
    </div>
    <div className="input-description">
      <label>
        <input
          type="text"
          placeholder="Description"
          onChange={ (e)=> props.addDescription(props.id, e.target.value) }/>
      </label>
    </div>
    { React.cloneElement(props.children, {
      styleName: 'item-body',
      setItemValue: props.setItemValue,
      itemId: props.id,
      checked: props.checked
    })}
 </div>
);

SettingsListItem.propTypes = {
  styleName: PropTypes.string,
  setItemValue: PropTypes.func,
  checked: PropTypes.any,
  id: PropTypes.number,
  name: PropTypes.string,
  addDescription: PropTypes.func,
  deleteItem: PropTypes.func.isRequired,
  children: PropTypes.any
};
