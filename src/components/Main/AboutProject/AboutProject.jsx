import React from 'react';
import './AboutProject.css';
import SectionTemplate from '../SectionTemplate/SectionTemplate';

function AboutProject() {
  return (
    <SectionTemplate
      title="О проекте"
      id="about"
    >
      <div className="about-project">
        <table className="about-project__table">
          <thead>
            <tr>
              <th className="about-project__table_header">Дипломный проект включал 5 этапов</th>
            </tr>
          </thead>
          <tbody className="about-project__table-body">
            <tr className="about-project__table-row">
              <td className="about-project__table-cell about-project__table-cell_type_empty">
                <span className="about-project__hidden-element">Отступ строка</span>
              </td>
            </tr>
            <tr className="about-project__table-row">
              <td className="about-project__table-cell">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</td>
            </tr>
          </tbody>
        </table>

        <table className="about-project__table">
          <thead>
            <tr>
              <th className="about-project__table_header">На выполнение диплома ушло 5 недель</th>
            </tr>
          </thead>
          <tbody className="about-project__table-body">
            <tr className="about-project__table-row">
              <td className="about-project__table-cell about-project__table-cell_type_empty">
                <span className="about-project__hidden-element">Отступ строка</span>
              </td>
            </tr>
            <tr className="about-project__table-row">
              <td className="about-project__table-cell">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul className="about-project__gant-container">
        <li className="about-project__gant about-project__gant_color_green">1 неделя</li>
        <li className="about-project__gant about-project__gant_color_grey">4 недели</li>
      </ul>
    </SectionTemplate>
  );
}

export default AboutProject;
