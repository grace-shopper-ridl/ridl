import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav className="nav">
    <ul className="nav__list">
      <li className="nav__item">
        <Link to="/home">Home</Link>
      </li>
      <li className="nav__item">
        <Link to="/products">Wines</Link>
      </li>
      <li className="nav__item">
        Categories{' '}
        <i className="fa fa-caret-down" aria-hidden="true">
          &nbsp;
        </i>
      </li>
    </ul>
    <h1 className="nav__header">wine-y</h1>
    <ul className="nav__list">
      {isLoggedIn ? (
        <li className="nav__item">
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </li>
      ) : (
        <li className="nav__item">
          <Link to="/login">Login</Link>
        </li>
      )}
      {isLoggedIn ? null : (
        <li className="nav__item">
          <Link to="/signup">Sign Up</Link>
        </li>
      )}
      {isLoggedIn && (
        <li className="nav__item">
          <Link to="/orderHistory">Order History</Link>
        </li>
      )}
      <li className="nav__item">
        <Link to="/cart">
          <i className="fa fa-shopping-cart" aria-hidden="true" />
        </Link>
      </li>
    </ul>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
