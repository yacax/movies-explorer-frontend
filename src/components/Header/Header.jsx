import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import '../Navigation/Navigation.css';
import IsLoggedIn from '../../contexts/IsLoggedInContext';
import Navigation from '../Navigation/Navigation';

function Header() {
  const location = useLocation();
  const isMain = location.pathname === '/';
  const { isLoggedIn } = React.useContext(IsLoggedIn);
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
        />
        {isLoggedIn && (
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

export default Header;
