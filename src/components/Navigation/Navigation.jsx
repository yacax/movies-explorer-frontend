import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation(
  { isLoggedIn },
) {
  return (
    <nav className={`navigation ${isLoggedIn ? 'navigation_logged' : ''}`}>
      {isLoggedIn ? (
        <>
          <div className="navigation__menu">
            <Link
              to="linkTo"
              className="navigation__link  navigation__link_logged navigation__link_active"
              onClick={() => { }}
            >
              Фильмы
            </Link>
            <Link
              to="linkTo"
              className="navigation__link  navigation__link_logged"
              onClick={() => { }}
            >
              Сохранённые фильмы
            </Link>
            <Link
              to="linkTo"
              className="navigation__button  navigation__button_logged"
            >
              Аккаунт
            </Link>
          </div>
          <input
            type="button"
            className="navigation__menu-open-button"
            name="navigation__menu-open-button"
          // value={() => { }}
          // disabled={() => { }}
          />
        </>
      ) : (
        <>
          <Link
            to="linkTo"
            className="navigation__link"
            onClick={() => { }}
          >
            Регистрация
          </Link>
          <Link
            to="linkTo"
            className="navigation__button"
          >
            Войти
          </Link>
        </>
      )}

    </nav>
  );
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navigation;
