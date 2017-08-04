import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

const Navigation = (props) => (
    <ul className={props.open ?
      'navigation navigation--shown' : 'navigation'}>
      <li className="navigation-item">
        <NavLink
          to="/"
          exact
          activeClassName="active">
          Home
        </NavLink>
      </li>
      <li className="navigation-item">
        <NavLink
          to="/builder"
          activeClassName="active">
          Device Builder
        </NavLink>
      </li>
      <li className="navigation-item">
        <NavLink
          to="/devices"
          activeClassName="active">
          Device List
        </NavLink>
      </li>
    </ul>
);

Navigation.propTypes = {
  open: PropTypes.bool,
};

export default Navigation;
