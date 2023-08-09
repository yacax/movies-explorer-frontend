import React from 'react';
import './Movies.css';

import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import savedMoviesArray from '../../utils/savedMoviesArray';
import Main from '../Main/Main';
import Preloader from '../Preloader/Preloader';

function Movies({
  searchHandle,
  showingMoviesArray,
  savedMovies,
  searchResultMessage,
  isShorts,
  isShortsHandler,
  isLoading,
  handleMovieButton,
}) {
  const moviesArray = showingMoviesArray.map((movie) => ({
    ...movie,
    save: savedMovies.some((m) => m.movieId === movie.movieId),
  }));

  return (
    <>
      <Header />
      <Main>
        <SearchForm
          searchHandle={searchHandle}
          isShorts={isShorts}
          isShortsHandler={isShortsHandler}
        />
        <section className="movies">
          {isLoading ? <Preloader />
            : (
              <MoviesCardList
                moviesArray={moviesArray}
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

Movies.propTypes = {
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
  savedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      movieId: PropTypes.number,
    }),
  ),
  searchResultMessage: PropTypes.string,
  isShorts: PropTypes.bool,
  isShortsHandler: PropTypes.func,
  isLoading: PropTypes.bool,
  handleMovieButton: PropTypes.func,
};

Movies.defaultProps = {
  savedMovies: PropTypes.shape([{
    moveisId: 0,
  }]),
  searchResultMessage: 'кажется что-то пошло не так...',
  isShorts: false,
  isShortsHandler: () => { },
  isLoading: false,
  handleMovieButton: () => { },
};

export default Movies;
