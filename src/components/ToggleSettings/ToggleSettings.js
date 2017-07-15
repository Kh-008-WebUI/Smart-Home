import React from 'react';
import PropTypes from 'prop-types';
import './ToggleStyle.scss';

export default class ToggleSettings extends React.Component {

  constructor (props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  onChangeValue (e) {
    this.props.onStatusChange(this.props.device);
    const newValue = e.target.value;

    this.setState({
      value: newValue
    });
    this.props.setItemValue(newValue, this.props.itemId);
  }

  render () {
    return (
      <div className={ `${ this.props.styleName }` }>
        <label className="switch">
          <input
            type="checkbox"
            defaultChecked={this.props.checked}
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
  checked: PropTypes.bool,
  setItemValue: PropTypes.func,
  itemId: PropTypes.number,
  newValue: PropTypes.string,
  onStatusChange: PropTypes.func
};
