import React, { Component } from 'react';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';

export const Field = (props) => (
  <div className="signup-field-group">
    <label
      htmlFor={ `${ props.name }` }
      className="signup-form__label">
      { props.name }
    </label>
    <input type="text"
      name={ `${ props.name }` }
      className="signup-form__input-field"/>
    <p className="caption signup-form__caption">
      { props.text }
    </p>
  </div>
);

Field.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string
};
