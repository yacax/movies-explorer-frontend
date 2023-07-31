import React from 'react';
import './AboutMe.css';
import avatar from '../../../images/avatar.jpg';
import SectionTemplate from '../SectionTemplate/SectionTemplate';

function AboutMe() {
  return (
    <SectionTemplate
      title="Студент"
      id="student"
    >
      <div className="about-me">
        <img
          className="about-me__avatar"
          src={avatar}
          alt="Так выглядит студент"
        />
        <div className="about-me__summary">
          <h2 className="about-me__title">Александр</h2>
          <h3 className="about-me__subtitle">Фронтенд-разработчик</h3>
          <p className="about-me__text">
            Я&nbsp;родился и&nbsp;вырос в&nbsp;Санкт-Петербурге, закончил
            факультет КТиУ ИТМО. У&nbsp;меня есть жена и&nbsp;две дочки.
            Я&nbsp;люблю слушать музыку, ходить на&nbsp;концерты, играть
            в&nbsp;волейбол и&nbsp;увлекаюсь бегом. Некоторое время
            я&nbsp;был инженером, потом работал в&nbsp;продажах. Мне
            всегда нравился дизайн, а&nbsp;недавно я&nbsp;начал кодить.
            После того как закончу курс Веб-разработчик от&nbsp;Яндекс
            Практикум, буду делать крутые штуки в&nbsp;сети.
          </p>
        </div>
      </div>
    </SectionTemplate>
  );
}

export default AboutMe;
