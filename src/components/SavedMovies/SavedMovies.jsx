import React from 'react';
import PropTypes from 'prop-types';

import './SavedMovies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import SavedMoviesArray from '../../utils/savedMoviesArray';
import Preloader from '../Preloader/Preloader';

function SavedMovies({
  searchHandle,
  showingMoviesArray,
  searchResultMessage,
  isShorts,
  isShortsHandler,
  isLoading,
  handleMovieButton,
  setResetSavedMoviesSearch,
}) {
  // console.log(`searchResultMessage внутри ${searchResultMessage}`);
  return (
    <>
      <Header />
      <Main>
        <SearchForm
          searchHandle={searchHandle}
          isShorts={isShorts}
          isShortsHandler={isShortsHandler}
          setResetSavedMoviesSearch={setResetSavedMoviesSearch}
        />
        <section className="saved-movies">
          {isLoading ? <Preloader />
            : (
              <MoviesCardList
                moviesArray={showingMoviesArray}
                searchResultMessage={searchResultMessage}
                handleMovieButton={handleMovieButton}
              />
            )}
        </section>
      </Main>
      <Footer />
    </>
  );
}

SavedMovies.propTypes = {
  searchHandle: PropTypes.func.isRequired,
  showingMoviesArray: PropTypes.arrayOf(
    PropTypes.shape({
      // id: PropTypes.number.isRequired,
      movieId: PropTypes.number.isRequired,
      nameRU: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      // searchRate: PropTypes.number.isRequired,
    }),
  ).isRequired,
  searchResultMessage: PropTypes.string,
  isShorts: PropTypes.bool,
  isShortsHandler: PropTypes.func,
  isLoading: PropTypes.bool,
  handleMovieButton: PropTypes.func,
  setResetSavedMoviesSearch: PropTypes.func,
};

SavedMovies.defaultProps = {
  searchResultMessage: 'кажется что-то пошло не так...',
  isShorts: false,
  isShortsHandler: () => { },
  isLoading: false,
  handleMovieButton: () => { },
  setResetSavedMoviesSearch: () => { },
};

export default SavedMovies;
