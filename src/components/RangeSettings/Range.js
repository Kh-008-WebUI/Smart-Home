import React from 'react';
import PropTypes from 'prop-types';
import './RangeStyle.scss';


export default class RangeSettings extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      value: 0
    };

    this.onChange = this.onChange.bind(this);
  }
  componentDidMount () {
    this.props.setItemValue(this.state.value, this.props.itemId);
    if (typeof this.props.data !== 'undefined') {
      this.setState({
        value: this.props.data
      });
      this.props.setItemValue(this.props.data, this.props.itemId);
    }
  }

  onChange (e) {
    const newValue = e.target.value;

    this.setState({
      value: newValue
    });
    this.props.setItemValue(newValue, this.props.itemId);
    if (typeof this.props.onTimerChange !== 'undefined') {
      this.props.onTimerChange(e);
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
  onTimerChange:PropTypes.func
};
