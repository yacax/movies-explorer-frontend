import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import PropTypes from 'prop-types';

function MoviesCard({
  movie,
  handleMovieButton,
}) {
  const location = useLocation();
  const savedMoviesPage = location.pathname === '/saved-movies';
  const toDoDurationInHours = (min) => `${Math.floor(min / 60)}ч ${min % 60}м`;
  const durationInHours = toDoDurationInHours(movie.duration);

  const onMovieButton = () => {
    handleMovieButton(movie);
  };

  // console.log(movie);

  return (
    <div className="movies-card">
      <h1 className="movies-card__title">{movie.nameRU}</h1>
      <p className="movies-card__text">{durationInHours}</p>
      <input
        type="button"
        className={`movies-card__save-button
        ${movie.save && !savedMoviesPage && 'movies-card__save-button_type_active'}
        ${savedMoviesPage && 'movies-card__save-button_type_delete'}`}
        name="movies-card__save-button"
        aria-label="Сохранить фильм"
        value=""
        onClick={onMovieButton}
      />
      <img
        src={movie.image}
        alt={movie.nameRU}
        className="movies-card__image"
      />
    </div>
  );
}

MoviesCard.propTypes = {
  movie: PropTypes.shape({
    // id: PropTypes.number.isRequired,
    movieId: PropTypes.number.isRequired,
    nameRU: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    // searchRate: PropTypes.number.isRequired,
    save: PropTypes.bool,
  }),
  handleMovieButton: PropTypes.func.isRequired,
  // isMovies: PropTypes.bool,
};

MoviesCard.defaultProps = {
  movie: {
    id: 0,
    nameRU: 'no name',
    duration: 'no name',
    link: 'no name',
    image: '',
    // searchRate: 0,
    save: false,
  },
  // isMovies: false,
};

export default MoviesCard;
