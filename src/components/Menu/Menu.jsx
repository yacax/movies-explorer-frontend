import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

function Menu() {
  return (
    <div className="menu">
      <NavLink
        to="/movies"
        className={({ isActive }) => `menu__link  menu__link_logged ${isActive ? 'menu__link_active' : ''}`}
      >
        Фильмы
      </NavLink>
      <NavLink
        to="/saved-movies"
        className={({ isActive }) => `menu__link  menu__link_logged ${isActive ? 'menu__link_active' : ''}`}
      >
        Сохранённые фильмы
      </NavLink>
      <NavLink
        to="/profile"
        className="menu__button  menu__button_logged"
      >
        Аккаунт
      </NavLink>
    </div>
  );
}

export default Menu;
