import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useSearch from '../../hooks/useSearch';

function SavedMovies({
  savedMovies,
  handleMovieButton,
}) {
  const {
    findedMovies,
    isNotFoundMessage,
    performSearch,
    isShortsOnly,
    setIsShortsOnly,
    setIsNotFoundMessage,
  } = useSearch();

  const searchHandle = (searchRequest) => {
    performSearch(searchRequest, savedMovies);
  };

  const isShortsHandler = () => {
    setIsShortsOnly(!isShortsOnly);
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    performSearch('*', savedMovies);
  }, [isShortsOnly, savedMovies]);

  useEffect(() => { setIsNotFoundMessage(''); }, []);
  return (
    <>
      <Header />
      <Main>
        <SearchForm
          searchHandle={searchHandle}
          isShorts={isShortsOnly}
          isShortsHandler={isShortsHandler}
        />
        <section className="saved-movies">
          <MoviesCardList
            moviesArray={(findedMovies.length > 0
              || isNotFoundMessage) ? findedMovies : savedMovies}
            searchResultMessage={isNotFoundMessage}
            handleMovieButton={handleMovieButton}
          />
        </section>
      </Main>
      <Footer />
    </>
  );
}

SavedMovies.propTypes = {
  savedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      movieId: PropTypes.number.isRequired,
      nameRU: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleMovieButton: PropTypes.func,
};

SavedMovies.defaultProps = {
  handleMovieButton: () => { },
};

export default SavedMovies;
