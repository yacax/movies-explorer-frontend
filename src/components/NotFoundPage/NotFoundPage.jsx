import React from 'react';
import './NotFoundPage.css';

function NotFoundPage() {
  const goBack = () => {
    window.history.back();
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
export default NotFoundPage;
