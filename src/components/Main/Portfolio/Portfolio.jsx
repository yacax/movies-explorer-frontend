import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <a
        href="https://github.com"
        className="portfolio__link-git"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
      <nav className="portfolio__navigation">
        <h4 className="portfolio__navigation-list-title">Портфолио</h4>
        <ul className="portfolio__navigation-list">
          <li className="portfolio__navigation-list-item">
            Статичный сайт
          </li>
          <li className="portfolio__navigation-list-item">
            Адаптивный сайт
          </li>
          <li className="portfolio__navigation-list-item">
            Одностраничное приложение
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
