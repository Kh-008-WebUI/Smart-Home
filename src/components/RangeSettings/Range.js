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

  onChange (e) {
    this.setState({
      value: e.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(e);
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
          defaultValue={0}
        />
      </div>
    );
  }
}

RangeSettings.propTypes = {
  styleName: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  setDevice: PropTypes.func,
  hideLabel: PropTypes.bool,
  onChange: PropTypes.func
};
