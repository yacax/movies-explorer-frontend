import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

import Navigation from '../Navigation/Navigation';

function Header({
  isLoggedIn,
}) {
  return (
    <header className={`header ${isLoggedIn && 'header_logged'}`}>
      <div className="header__base">
        <div className="header__logo" />
        <Navigation
          isLoggedIn={isLoggedIn}
        />
      </div>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
  isLoggedIn: false,
};

export default Header;
