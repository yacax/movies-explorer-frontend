import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  moviesArray,
  searchResultMessage,
  handleMovieButton,
}) {
  const location = useLocation();
  const isMovies = location.pathname === '/movies';
  const [visibleMovies, setVisibleMovies] = useState(3);
  const [displayState, setDisplayState] = useState('large');

  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (window.innerWidth < 767) {
          setDisplayState('small');
        } else if (window.innerWidth >= 768 && window.innerWidth <= 1279) {
          setDisplayState('middle');
        } else {
          setDisplayState('large');
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMovies) {
      setVisibleMovies(moviesArray.length);
    } else {
      const displayStateConfig = {
        middle: 8,
        large: 12,
        default: 5,
      };

      setVisibleMovies(displayStateConfig[displayState] || displayStateConfig.default);
    }
  }, [displayState]);

  const handleLoadMore = () => {
    const extraMovies = displayState === 'large' ? 3 : 2;
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + extraMovies);
  };
  const moviesToShow = moviesArray.slice(0, visibleMovies);

  const movies = moviesToShow.length
    ? moviesToShow.map((m) => (
      <MoviesCard
        key={m.movieId}
        movie={m}
        handleMovieButton={handleMovieButton}
      />
    ))
    : (
      <div className="movies-card-list__text-container">
        <p className="movies-card-list__text">
          {searchResultMessage}
        </p>
      </div>
    );

  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {movies}
      </div>

      {isMovies && (movies.length !== moviesArray.length && movies.length > 0) && (
        <button
          className="movies-card-list__button"
          type="button"
          onClick={handleLoadMore}
        >
          Ещё
        </button>
      )}
    </div>
  );
}

MoviesCardList.propTypes = {
  moviesArray: PropTypes.arrayOf(
    PropTypes.shape({
      movieId: PropTypes.number.isRequired,
      nameRU: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,

      save: PropTypes.bool,
    }),
  ),
  searchResultMessage: PropTypes.string.isRequired,
  handleMovieButton: PropTypes.func.isRequired,
};

MoviesCardList.defaultProps = {
  moviesArray: [{
    movieId: 0,
    nameRU: 'no name',
    duration: 0,
    image: '',
    save: false,
  }],
};

export default MoviesCardList;
