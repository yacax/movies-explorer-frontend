import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
import './Header.css';
import '../Navigation/Navigation.css';
// import IsLoggedIn from '../../contexts/IsLoggedInContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Navigation from '../Navigation/Navigation';

function Header() {
  const location = useLocation();
  const isMain = location.pathname === '/';
  // const { isLoggedIn } = React.useContext(IsLoggedIn);
  const user = React.useContext(CurrentUserContext);
  const [isPopup, setIsPopup] = useState(false);

  const popupNavigationHandler = () => {
    setIsPopup(!isPopup);
  };

  return (
    <header className={`header ${!isMain ? 'header_logged' : ''}`}>
      <div className="header__base">
        <NavLink to="/" className="header__logo" />
        <Navigation
          isPopup={isPopup}
          closePopup={popupNavigationHandler}
        // isLoggedIn={user.isLoggedIn}
        />
        {user.isLoggedIn && (
          <input
            type="button"
            className={`header__menu-open-button ${isMain ? 'header__menu-open-button_color_white' : ''}`}
            name="header__menu-open-button"
            onClick={popupNavigationHandler}
          />
        )}
      </div>
    </header>
  );
}

// Header.propTypes = {
//   isLoggedIn: PropTypes.bool,
// };

// Header.defaultProps = {
//   isLoggedIn: false,
// };

export default Header;
