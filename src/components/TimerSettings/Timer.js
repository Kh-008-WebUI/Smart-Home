import React from 'react';
import PropTypes from 'prop-types';
import './TimerStyle.scss';
import RangeSettings from '../RangeSettings/Range';

export default class TimerSettings extends React.Component {
  addLeadingZero (number) {
    return (number < 10) ? ('0' + number) : number;
  }

  constructor (props) {
    super(props);

    this.state = {
      hours: this.addLeadingZero(0),
      minutes: this.addLeadingZero(0)
    };

    this.changeHours = this.changeHours.bind(this);
    this.changeMinutes = this.changeMinutes.bind(this);
  }
  componentWillMount () {
    if (typeof this.props.data !== 'undefined') {
      const time = this.props.data.split(':');

      this.setState({
        hours:time[0],
        minutes:time[1]
      });
      this.props.setItemValue(this.props.data, this.props.itemId);
    }
  }

  changeHours (event) {
    this.setState({
      hours: this.addLeadingZero(event.target.value)
    });
    this.props.setItemValue(`${this.state.hours}:${this.state.minutes}`,
      this.props.itemId);
  }

  changeMinutes (event) {
    this.setState({
      minutes: this.addLeadingZero(event.target.value)
    });
    this.props.setItemValue(`${this.state.hours}:${this.state.minutes}`,
      this.props.itemId);
  }

  render () {
    return (
<div className={`m-time ${this.props.styleName}`}>
        <div className='showtime'>
          <span className='showtime__time'>{this.state.hours}</span>
          <span className='showtime__separater'>:</span>
          <span className='showtime__time'>{this.state.minutes}</span>
        </div>

        <div className='sliders'>
          <div className='sliders__time-text'>Hours</div>
          <RangeSettings
            className='u-slider-time'
            min={0}
            max={23}
            setItemValue={this.props.setItemValue}
            onTimerChange={this.changeHours}
            hideLabel={true}
            data={this.state.hours}
          />
          <div className='sliders__time-text'>Minutes</div>
          <RangeSettings
            className='u-slider-time'
            min={0}
            max={59}
            setItemValue={this.props.setItemValue}
            onTimerChange={this.changeMinutes}
            hideLabel={true}
            data={this.state.minutes}
          />
        </div>
      </div>
    );
  }
}
TimerSettings.propTypes = {
  styleName: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  setItemValue: PropTypes.func,
  itemId: PropTypes.number,
  newValue: PropTypes.string,
  data: PropTypes.string
};
