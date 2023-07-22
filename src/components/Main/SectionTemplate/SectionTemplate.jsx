import React from 'react';
import './SectionTemplate.css';
import PropTypes from 'prop-types';

function SectionTemplate(
  {
    title = 'Тут должен быть заголовок',
    id = 'none',
    children,
    // extraClassName = 'none',
  },
) {
  return (
    // <section className={`section ${(extraClassName !== 'none' && extraClassName)
    // ? `section__${extraClassName}` : ''}`}>
    <section
      className={`section section_name_${id}`}
      id={id}
    >
      <h2
        className="section__title"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

SectionTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string.isRequired,
  // extraClassName: PropTypes.string.isRequired,
};

export default SectionTemplate;
