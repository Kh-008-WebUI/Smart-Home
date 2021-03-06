import React from 'react';
import PropTypes from 'prop-types';
import './ValueStyle.scss';

export default class ValueSettings extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  componentDidMount () {
    if (typeof this.props.data !== 'undefined') {
      this.setState({
        value: this.props.data
      });
    }
  }
  setTextValue = (e) => {
    this.props.setItemValue(this.state.value,
      this.props.itemId,
      this.props.deviceId);
  }

  onChangeValue = (e) => {
    const newValue = e.target.value;

    this.setState({
      value: newValue
    });
  }

  render () {
    return (
      <div className={ `${ this.props.styleName }` }>
        <input
          type='text'
          className='value_input'
          placeholder='Input...'
          value={this.state.value}
          onChange={this.onChangeValue}
          onBlur={this.setTextValue}
        />
      </div>
    );
  }
}

ValueSettings.propTypes = {
  styleName: PropTypes.string,
  value: PropTypes.string,
  onChangeValue: PropTypes.func,
  setItemValue: PropTypes.func,
  itemId: PropTypes.number,
  newValue: PropTypes.string,
  data: PropTypes.string,
  deviceId: PropTypes.string
};
