import React from 'react';
import PropTypes from 'prop-types';
import './ToggleStyle.scss';

export default class ToggleSettings extends React.Component {

  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange () {
    this.props.onStatusChange(this.props.id);
  }

  render () {
    return (
      <div className={ `${ this.props.styleName }` }>
        <label className="switch">
          <input
            type="checkbox"
            defaultChecked={this.props.checked}
            onClick={this.onChange}
          />
          <div className="slider round"></div>
        </label>
      </div>
    );
  }
}

ToggleSettings.propTypes = {
  id: PropTypes.number,
  styleName: PropTypes.string,
  checked: PropTypes.bool,
  onStatusChange: PropTypes.func
};
