import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
// import moviesArray from '../../utils/cardsArray';

function MoviesCardList({
  moviesArray,
  savedMoviesPage,
}) {
  const [visibleMovies, setVisibleMovies] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setVisibleMovies(5);
      } else if (window.innerWidth >= 650 && window.innerWidth <= 1136) {
        setVisibleMovies(8);
      } else if (window.innerWidth > 1136 && window.innerWidth < 1279) {
        setVisibleMovies(9);
      } else {
        setVisibleMovies(12);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLoadMore = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies * 2);
  };

  const movies = moviesArray.slice(0, visibleMovies).map((m) => (
    <MoviesCard
      key={m._id}
      movie={m}
      savedMoviesPage={savedMoviesPage}
    />
  ));
  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {movies}
      </div>
      <button
        className="movies-card-list__button"
        type="button"
        onClick={handleLoadMore}
      >
        Ещё
      </button>

    </div>
  );
}

MoviesCardList.propTypes = {
  moviesArray: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      duration: PropTypes.string,
      link: PropTypes.string.isRequired,
      save: PropTypes.bool,
    }),
  ),
  savedMoviesPage: PropTypes.bool,
};

MoviesCardList.defaultProps = {
  moviesArray: PropTypes.shape({
    name: 'no name',
    duration: 'no name',
    link: 'no name',
    save: false,
  }),
  savedMoviesPage: false,
};

export default MoviesCardList;
