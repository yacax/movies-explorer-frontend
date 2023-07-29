import React from 'react';
import './Movies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesArrayFromServer from '../../utils/moviesArray';
import savedMoviesArray from '../../utils/savedMoviesArray';

function Movies() {
  const moviesArray = moviesArrayFromServer.map((movie) => ({
    ...movie,
    save: savedMoviesArray.some((savedMovie) => savedMovie._id === movie._id),
  }));

  return (
    <>
      <Header />
      <SearchForm />
      <section className="movies">
        <MoviesCardList
          moviesArray={moviesArray}
          savedMoviesPage={false}
        />
      </section>
      <Footer />
    </>
  );
}
export default Movies;
