import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm() {
  const [checked, setChecked] = useState(false);

  return (
    <section className="search-form">

      <div
        className="search-form__box"
      >
        <input
          type="text"
          className="search-form__input"
          name="input"
          placeholder="Фильм"
          id="input"
        />
        <input
          type="submit"
          className="search-form__submit"
          name="movie-search-submit"
          aria-label="Найти фильм"
          value=""
        />
      </div>

      <label
        className="search-form__checkbox-container"
        htmlFor="shortfilm"
      >
        <input
          id="shortfilm"
          type="checkbox"
          className="search-form__checkbox"
          name="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <span className="search-form__checkbox-indicator" />
        Короткометражки
      </label>
    </section>
  );
}
export default SearchForm;
