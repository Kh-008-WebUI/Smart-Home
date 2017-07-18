import React from 'react';
import PropTypes from 'prop-types';
import './ToggleStyle.scss';

export default class ToggleSettings extends React.Component {

  constructor (props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.state = {
      checked: false
    };
  }
  onChangeValue (e) {
    this.props.setItemValue(!this.state.checked, this.props.itemId);
    this.setState({
      checked: !this.state.checked
    });
  }
  componentDidMount () {
    if (typeof this.props.checked !== 'undefined') {
      this.setState({
        checked: this.props.checked
      });
    }
  }
  render () {
    return (
      <div className={ `${ this.props.styleName }` }>
        <label className="switch">
          <input
            type="checkbox"
            checked={this.state.checked}
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
  newValue: PropTypes.string
};
