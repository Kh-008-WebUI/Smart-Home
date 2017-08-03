import React from 'react';
import PropTypes from 'prop-types';
import './ToggleStyle.scss';

export default class ToggleSettings extends React.Component {

  constructor (props) {
    super(props);
  }

  onChangeValue = (e) => {
    this.props.setItemValue(!this.props.checked,
      this.props.itemId,
      this.props.deviceId);
  }

  render () {
    return (
      <div className={ `${ this.props.styleName }` }>
        <label className="switch">
          <input
            type="checkbox"
            checked={this.props.checked}
            onChange={this.onChangeValue}
          />
          <div className="slider round"></div>
        </label>
      </div>
    );
  }
}

ToggleSettings.propTypes = {
  device: PropTypes.object,
  styleName: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  setItemValue: PropTypes.func,
  itemId: PropTypes.any,
  newValue: PropTypes.string,
  deviceId: PropTypes.string
};
ToggleSettings.defaultProps = {
  checked: false
};
