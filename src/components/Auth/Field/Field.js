import React, { Component } from 'react';
import Formsy, { HOC } from 'formsy-react';
import PropTypes from 'prop-types';

class Field extends React.Component {
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
      <div className="signup-field-group">
        <label
          htmlFor={ this.props.name.toLowerCase() }
          className="signup-form__label">
          { this.props.name }
        </label>
        <input
          onChange={this.changeValue}
          value={this.props.getValue()}
          type={this.props.type || 'text'}
          name={ this.props.name.toLowerCase() }
          className="signup-form__input-field"/>
        <p className="caption signup-form__caption">
          { this.props.text }
        </p>
        <span className="signup-form__error-message">{errorMessage}</span>
      </div>
    );
  }
}

Field.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  setValue: PropTypes.any,
  getValue: PropTypes.func,
  validations: PropTypes.any,
  getErrorMessage: PropTypes.func,
  registration: PropTypes.func
};

export default HOC(Field);
