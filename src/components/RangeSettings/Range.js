import React from 'react';
import PropTypes from 'prop-types';
import './RangeStyle.scss';


export default class RangeSettings extends React.Component {
  constructor (props) {
    super(props);

    let minValue, maxValue;

    if (this.props.params) {
      minValue = this.props.params.minValue;
      maxValue = this.props.params.maxValue;
    }

    this.state = {
      value: 0,
      params: {
        minValue: minValue || 0,
        maxValue: maxValue || 100
      }
    };

    this.setMinValue = (e) => {
      const min = parseInt(e.target.value) || '';

      if (min <= this.state.params.maxValue) {
        this.setState({
          params: {
            minValue: min,
            maxValue: this.state.params.maxValue
          }
        });
      } else {
        e.target.setCustomValidity(`Value shoul be less then ${maxValue}`);
        e.target.reportValidity();
      }
    };

    this.setMaxValue = (e) => {
      const max = parseInt(e.target.value) || '';

      if (max > this.state.params.minValue) {
        this.setState({
          params: {
            maxValue: max,
            minValue: this.state.params.minValue
          }
        });
      } else {
        e.target.setCustomValidity(`Value shoul be less then ${minValue}`);
        e.target.reportValidity();
      }
    };
  }

  componentDidMount () {
    if (typeof this.props.data !== 'undefined') {
      this.setState({
        value: this.props.data
      });
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.data || 0
    });
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

  setParams = () => {
    const params = {
      minValue: this.state.params.minValue || 0,
      maxValue: this.state.params.maxValue || 100
    };

    this.props.setParameters(
      this.props.itemId,
      params);
  }

  render () {
    const { min, max } = this.props;

    return (
      <div className={ `${ this.props.styleName }` }>
        {this.props.showMinMax ?
          <div className="range-settings">
            <p className="range-settings__title">
              Enter min and max values for setting
            </p>
            <div className="range-settings__group">
              <div className="range-settings__val">
                <input
                  type="number"
                  name="min"
                  placeholder="Enter min value"
                  onChange={ this.setMinValue }
                  value={ this.state.params.minValue }
                  onBlur={ this.setParams }/>
              </div>
              <div className="range-settings__val">
                <input
                  type="number"
                  name="max"
                  placeholder="Enter max value"
                  onChange={ this.setMaxValue }
                  value={ this.state.params.maxValue }
                  onBlur={ this.setParams }/>
              </div>
            </div>
          </div> :
          null
        }
        {this.props.hideLabel ? null : <p className='range_value'>
          {this.state.value}</p>}
        <input
          type='range'
          onChange={ this.onChange }
          onMouseUp={ this.setValue }
          min={min || this.state.params.minValue}
          max={max || this.state.params.maxValue}
          step={1}
          value={ this.state.value }
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
  deviceId: PropTypes.string,
  setTimerValue: PropTypes.func,
  setParameters: PropTypes.func,
  showMinMax: PropTypes.bool,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  params: PropTypes.object
};
