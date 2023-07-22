import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesArrayFromServer from '../../utils/moviesArray';
import savedMoviesArray from '../../utils/savedMoviesArray';

function Movies() {
  // const moviesArray = moviesArrayFromServer.map((movie) => {
  //   if (savedMoviesArray.some((savedMovie) => savedMovie._id === movie._id)) {
  //     return {
  //       ...movie,
  //       save: true,
  //     };
  //   }
  //   return { ...movie };
  // });
  const moviesArray = moviesArrayFromServer.map((movie) => ({
    ...movie,
    save: savedMoviesArray.some((savedMovie) => savedMovie._id === movie._id),
  }));

  return (
    <>
      <SearchForm />
      <section className="movies">
        <MoviesCardList
          moviesArray={moviesArray}
          savedMoviesPage={false}
        />
      </section>
    </>
  );
}
export default Movies;
