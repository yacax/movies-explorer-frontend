import React, { useEffect } from 'react';
import './SearchForm.css';
import PropTypes from 'prop-types';
import useForm from '../../hooks/useForm';
// import getMoviesRequest from '../../utils/MoviesApi';

function SearchForm({
  searchHandle,
  isShorts,
  isShortsHandler,
  setResetSavedMoviesSearch,
}) {
  const {
    form,
    errors,
    handleChange,
    setCustomError,
    handleFocus,
    isActiveInput,

  } = useForm({
    search: '',
    searchError: '',
  });

  // const currentSearchFieldValue = () => {
  //   console.log(form.search);
  // };

  useEffect(() => {
    if (isActiveInput.name && form.search === '') setResetSavedMoviesSearch(true);
    else setResetSavedMoviesSearch(false);
    // console.log(isActiveInput);
  }, [form.search]);

  // const [checked, setChecked] = useState(false);
  // const [searchInput, setSearchInput] = useState('');
  // const [searchError, setSearchError] = useState('');

  const searchSubmitHandle = (e) => {
    e.preventDefault();
    if (form.search === '') {
      // console.log(isActiveInput);
      setCustomError('search', 'Нужно ввести ключевое слово');
    } else {
      searchHandle(form.search);
    }
  };

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        onSubmit={searchSubmitHandle}
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
            onFocus={handleFocus}
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
          checked={isShorts}
          onChange={isShortsHandler}
        />
        <span className="search-form__checkbox-indicator" />
        Короткометражки
      </label>
    </section>
  );
}

SearchForm.propTypes = {
  searchHandle: PropTypes.func.isRequired,
  isShorts: PropTypes.bool.isRequired,
  isShortsHandler: PropTypes.func.isRequired,
  setResetSavedMoviesSearch: PropTypes.func,
};

SearchForm.defaultProps = {
  setResetSavedMoviesSearch: () => { },
};

export default SearchForm;
