import React from 'react';
import PropTypes from 'prop-types';
import './RangeStyle.scss';


export default class RangeSettings extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  componentDidMount () {
    if (typeof this.props.data !== 'undefined') {
      this.setState({
        value: this.props.data
      });
    }
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    });

    if (typeof this.props.onTimerChange !== 'undefined') {
      this.props.onTimerChange(e);
    }
  }

  setValue = (e) => {
    if (typeof this.props.setTimerValue !== 'undefined') {
      this.props.setTimerValue();
    } else {
      this.props.setItemValue(this.state.value,
                            this.props.itemId,
                            this.props.deviceId);
    }
  }

  render () {
    const { max, min } = this.props;

    return (
      <div className={ `${ this.props.styleName }` }>
        {this.props.hideLabel ? null : <p className='range_value'>
          {this.state.value}</p>}
        <input
          type='range'
          onChange={ this.onChange }
          onMouseUp={ this.setValue }
          min={min || 0}
          max={max || 100}
          step={1}
          value={this.state.value}
        />
      </div>
    );
  }
}

RangeSettings.propTypes = {
  styleName: PropTypes.string,
  itemId: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  setDevice: PropTypes.func,
  hideLabel: PropTypes.bool,
  setItemValue: PropTypes.func,
  data: PropTypes.any,
  onTimerChange:PropTypes.func,
  deviceId: PropTypes.string
};
