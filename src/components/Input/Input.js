import React, { Component } from 'react';
import Formsy, { HOC } from 'formsy-react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor (props) {
    super(props);
    this.changeValue = (event) => {
      this.props.setValue(event.currentTarget[this.props.type === 'checkbox' ?
        'checked' : 'value']);
    };
  }
  render () {
    const errorMessage = this.props.getErrorMessage();

    return (
      <div className="profile-field">
        <span className="profile-field__label">{this.props.label}</span>
        {this.props.disabled ?
          <span className="profile-field__value">
            {this.props.value}
          </span>
          :
          <label>
            <input
              name={this.props.name.toLowerCase()}
              type={this.props.type || 'text'}
              onChange={this.changeValue}
              value={this.props.getValue()}
              placeholder={this.props.placeholder || ''}/>
            <i className="profile-field__input-icon fa-pencil fa "></i>
            <span className="signup-form__error-message">{errorMessage}</span>
          </label>
        }
      </div>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  setValue: PropTypes.any,
  getValue: PropTypes.func,
  getErrorMessage: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
};

export default HOC(Input);
