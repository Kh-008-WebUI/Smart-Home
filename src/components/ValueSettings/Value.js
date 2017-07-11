import React from 'react';
import PropTypes from 'prop-types';
import './ValueStyle.scss';

export default class ValueSettings extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.clearInputValue = this.clearInputValue.bind(this);
  }

  onChangeValue (e) {
    this.setState({
      value: e.target.value
    });

    this.props.sendSearchValue(e.target.value);
  }

  clearInputValue () {
    this.setState({
      value: ''
    });

    this.props.sendSearchValue('');
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
        />
        <button type='button'
        onClick={this.clearInputValue}
        className='delete_value'/>
      </div>
    );
  }
}

ValueSettings.propTypes = {
  styleName: PropTypes.string,
  value: PropTypes.string,
  sendSearchValue: PropTypes.string
};
