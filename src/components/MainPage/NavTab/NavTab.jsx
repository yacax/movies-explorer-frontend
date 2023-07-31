import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li><a href="#about" className="navtab__link">О проекте</a></li>
        <li><a href="#tech" className="navtab__link">Технологии</a></li>
        <li><a href="#student" className="navtab__link">Студент</a></li>
      </ul>
    </nav>
  );
}

export default NavTab;
