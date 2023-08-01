import React, { useState } from 'react';
import './SearchForm.css';
import useForm from '../../hooks/useForm';

function SearchForm() {
  const {
    form,
    errors,
    handleChange,
    setCustomError,
    isActiveInput,
  } = useForm({
    search: '',
    searchError: '',
  });

  const [checked, setChecked] = useState(false);
  // const [searchInput, setSearchInput] = useState('');
  // const [searchError, setSearchError] = useState('');

  const searchSubmit = (e) => {
    e.preventDefault();
    if (form.search === '') {
      console.log(isActiveInput);
      setCustomError('search', 'Нужно ввести ключевое слово');
    }
  };

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        onSubmit={searchSubmit}
      >
        <label
          className="search-form__label"
          htmlFor="name"
        >
          <input
            type="text"
            className="search-form__input"
            name="search"
            placeholder="Фильм"
            id="search"
            // required
            // minLength="1"
            maxLength="50"
            value={form.search}
            onChange={handleChange}
          />
          <span className="search-form__error-text">
            {errors.search}
          </span>
        </label>
        <input
          type="submit"
          className="search-form__submit"
          name="movie-search-submit"
          aria-label="Найти фильм"
          value=""
        />

        {/* <div
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
        </div> */}
      </form>

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
