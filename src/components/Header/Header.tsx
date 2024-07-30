import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <nav className="nav">
      <div className="container header-container">
        <NavLink to="/" className="navbar-brand">Finance Tracker</NavLink>
        <ul className={'nav-list'}>
          <li className={'nav-item'}>
            <NavLink
              to="/categories"
              className={'nav-link'}
            >
              Categories
            </NavLink>
          </li>
          <li className={'nav-item'}>
            <NavLink
              to="add-transaction"
              className={'nav-link'}
            >
              Add
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Header;