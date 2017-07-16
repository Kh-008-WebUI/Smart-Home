import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => (
    <ul className="navigation mob-hide">
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
          activeClassName="active">
          Register
        </NavLink>
      </li>
    </ul>
);

export default Navigation;

