import React from 'react';
import './AboutMe.css';
import avatar from '../../../images/avatar.jpg';
import SectionTemplate from '../SectionTemplate/SectionTemplate';

function AboutMe() {
  return (
    <SectionTemplate
      title="Студент"
      id="student"
    // extraClassName
    >
      <div className="about-me">
        <img
          className="about-me__avatar"
          src={avatar}
          alt="Так выглядит студент"
        />
        <div className="about-me__summary">
          <h2 className="about-me__title">Виталий</h2>
          <h3 className="about-me__subtitle">Фронтенд-разработчик, 30 лет</h3>
          <p className="about-me__text">
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове,
            закончил факультет экономики СГУ. У&nbsp;меня есть жена
            и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё
            увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года
            работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того,
            как прошёл курс по&nbsp;веб-разработке, начал
            заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          {/* <a
            href="https://github.com"
            className="about-me__link-git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a> */}
        </div>
        {/*
        <nav className="about-me__navigation">
          <h4 className="about-me__navigation-list-title">Портфолио</h4>
          <ul className="about-me__navigation-list">
            <li className="about-me__navigation-list-item">
              Статичный сайт
            </li>
            <li className="about-me__navigation-list-item">
              Адаптивный сайт
            </li>
            <li className="about-me__navigation-list-item">
              Одностраничное приложение
            </li>
          </ul>
        </nav> */}
      </div>
    </SectionTemplate>
  );
}

export default AboutMe;
