import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';
import PropTypes from 'prop-types';
import IsLoggedIn from '../../contexts/IsLoggedInContext';

function Navigation({
  isPopup,
  closePopup,
}) {
  const { isLoggedIn } = React.useContext(IsLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const isMain = location.pathname === '/';

  const loginHandler = () => {
    navigate('/signin');
  };

  const navigationType = !isPopup ? 'navigation__menu' : 'navigation__popup';

  const toDoNavLinkClass = (isActive) => {
    const baseClass = 'navigation__link navigation__link_logged';
    const activeClass = isActive ? 'navigation__link_active' : '';
    const popupClass = isPopup ? 'navigation__link_popup' : '';
    const mainClass = isMain && !isPopup ? 'navigation__link_color_white' : '';

    return `${baseClass} ${activeClass} ${popupClass} ${mainClass}`;
  };

  return (
    <nav className={`navigation ${isLoggedIn ? 'navigation_logged' : ''}`}>
      {isLoggedIn ? (
        <div className={navigationType}>
          {isPopup && (
            <NavLink to="/" className={({ isActive }) => toDoNavLinkClass(isActive)}>
              Главная
            </NavLink>
          )}
          <NavLink to="/movies" className={({ isActive }) => toDoNavLinkClass(isActive)}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className={({ isActive }) => toDoNavLinkClass(isActive)}>
            Сохранённые фильмы
          </NavLink>
          <NavLink to="/profile" className={`navigation__button navigation__button_logged ${isPopup ? 'navigation__button_popup' : ''}`}>
            Аккаунт
          </NavLink>
          {isPopup && (
            <button
              type="button"
              className="navigation__close-popup-button"
              name="popup-close-button"
              aria-label="Закрыть"
              value=""
              onClick={closePopup}
            />
          )}
        </div>
      ) : (
        <>
          <NavLink to="/signup" className="navigation__link">
            Регистрация
          </NavLink>
          <input type="button" className="navigation__button" onClick={loginHandler} value="Войти" />
        </>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  isPopup: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default Navigation;
