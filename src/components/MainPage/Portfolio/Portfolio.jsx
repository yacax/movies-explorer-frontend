import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <a
        href="https://github.com/yacax"
        className="portfolio__link-git"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
      <div className="portfolio__navigation">
        <h4 className="portfolio__navigation-list-title">Портфолио</h4>
        <ul className="portfolio__navigation-list">
          <li className="portfolio__navigation-list-item">
            <a
              href="https://github.com/yacax/how-to-learn"
              className="portfolio__navigation-list-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__navigation-list-item">
            <a
              href="https://yacax.github.io/russian-travel/"
              className="portfolio__navigation-list-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__navigation-list-item">
            <a
              href="https://yacax.nomoreparties.sbs/"
              className="portfolio__navigation-list-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
