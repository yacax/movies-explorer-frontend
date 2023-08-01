import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">
          &copy;
          {' '}
          {currentYear}
        </p>
        <nav className="footer__navigation">
          <li>
            <a
              href="https://practicum.yandex.ru/"
              className="footer__navigation-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/yacax"
              className="footer__navigation-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </nav>
      </div>

    </footer>
  );
}
export default Footer;
