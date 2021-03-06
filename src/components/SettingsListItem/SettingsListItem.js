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
    <div>
      <label>
        <input
          className="description-input"
          placeholder="Description"
          type="text"
          value={props.description}
          onChange={ (e)=> props.addDescription(props.id, e.target.value) }/>
      </label>
    </div>
    { React.cloneElement(props.children, {
      styleName: 'item-body',
      setItemValue: props.setItemValue,
      setParameters: props.setParameters,
      itemId: props.id,
      checked: props.checked,
      data: props.data,
      params: props.params,
      showMinMax: true
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
  children: PropTypes.any,
  description: PropTypes.string,
  data: PropTypes.any,
  setParameters: PropTypes.func,
  params: PropTypes.object
};
