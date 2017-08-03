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
      <li className="navigation-item">
        <NavLink
          to="/auth"
          onClick={(e)=>{
            e.preventDefault();
            props.logout();
          }}
          activeClassName="active">
          Logout
        </NavLink>
      </li>
    </ul>
);

Navigation.propTypes = {
  open: PropTypes.bool,
  logout: PropTypes.func
};

export default Navigation;
