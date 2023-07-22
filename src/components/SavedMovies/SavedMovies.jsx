import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SavedMoviesArray from '../../utils/savedMoviesArray';

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <section className="saved-movies">
        <MoviesCardList
          moviesArray={SavedMoviesArray}
          savedMoviesPage
        />
      </section>
    </>
  );
}
export default SavedMovies;
