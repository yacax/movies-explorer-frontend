import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NotFoundPage.css';

function NotFoundPage({ lastPath }) {
  const navigate = useNavigate();

  const goBack = () => {
    if (lastPath) {
      navigate(lastPath);
    } else {
      navigate('/');
    }
  };

  return (
    <div
      className="not-found-page"
    >
      <h3
        className="not-found-page__title"
      >
        404
      </h3>
      <p
        className="not-found-page__text"
      >
        Страница не найдена
      </p>
      <button
        className="not-found-page__link"
        type="button"
        onClick={goBack}
      >
        Назад
      </button>
    </div>
  );
}

NotFoundPage.propTypes = {
  lastPath: PropTypes.string,
};

NotFoundPage.defaultProps = {
  lastPath: '/',
};

export default NotFoundPage;
