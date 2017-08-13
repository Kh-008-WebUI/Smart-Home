import React from 'react';
import PropTypes from 'prop-types';
import './RangeStyle.scss';


export default class RangeSettings extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      value: 0,
      params: {
        minValue: 0,
        maxValue: 100
      }
    };

    this.setMinValue = (e) => {
      this.setState({
        params: {
          minValue: e.target.value,
          maxValue: this.state.params.maxValue
        }
      });
    };

    this.setMaxValue = (e) => {
      this.setState({
        params: {
          maxValue: e.target.value,
          minValue: this.state.params.minValue
        }
      });
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
    this.props.setParameters(
      this.props.itemId,
      this.state.params);
  }

  render () {
    const { max, min } = this.props;

    return (
      <div className={ `${ this.props.styleName }` }>
        <div className="range__settings">
          <div className="range__settings--min">
            <input
              type="number"
              name="min"
              placeholder="Enter min value"
              onChange={ this.setMinValue }/>
          </div>
          <div className="range__settings--max">
            <input
              type="number"
              name="max"
              placeholder="Enter max value"
              onChange={ this.setMaxValue }/>
          </div>
        </div>
        {this.props.hideLabel ? null : <p className='range_value'>
          {this.state.value}</p>}
        <input
          type='range'
          onChange={ this.onChange }
          onMouseUp={ () => {
            this.setParams();
            this.setValue();
          }}
          min={min || this.state.params.minValue}
          max={max || this.state.params.maxValue}
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
  deviceId: PropTypes.string,
  setTimerValue: PropTypes.func,
  setParameters: PropTypes.func
};
