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

  changeHours (event) {
    this.setState({
      hours: this.addLeadingZero(event.target.value)
    });
  }

  changeMinutes (event) {
    this.setState({
      minutes: this.addLeadingZero(event.target.value)
    });
  }

  render () {
    return (
<div className={`m-time ${this.props.styleName}`}>
        <div className="showtime">
          <span className="time">{this.state.hours}</span>
          <span className="separater">:</span>
          <span className="time">{this.state.minutes}</span>
        </div>

        <div className='sliders'>
          <div className='sliders__time-text'>Hours</div>
          <RangeSettings
            className='u-slider-time'
            min={0}
            max={23}
            onChange={this.changeHours}
            hideLabel={true}
          />
          <div className='sliders__time-text'>Minutes</div>
          <RangeSettings
            className='u-slider-time'
            min={0}
            max={59}
            onChange={this.changeMinutes}
            hideLabel={true}
          />
        </div>
      </div>
    );
  }
}
TimerSettings.propTypes = {
  styleName: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};
