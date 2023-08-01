import React from 'react';
import './SavedMovies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SavedMoviesArray from '../../utils/savedMoviesArray';

function SavedMovies() {
  return (
    <>
      <Header />
      <Main>
        <SearchForm />
        <section className="saved-movies">
          <MoviesCardList
            moviesArray={SavedMoviesArray}
          />
        </section>
      </Main>
      <Footer />
    </>
  );
}
export default SavedMovies;
