import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import PropTypes from 'prop-types';

function MoviesCard({
  movie,
}) {
  const location = useLocation();
  const savedMoviesPage = location.pathname === '/saved-movies';
  return (
    <div className="movies-card">
      <h1 className="movies-card__title">{movie.name}</h1>
      <p className="movies-card__text">{movie.duration}</p>
      <input
        type="button"
        className={`movies-card__save-button
        ${movie.save && !savedMoviesPage && 'movies-card__save-button_type_active'}
        ${savedMoviesPage && 'movies-card__save-button_type_delete'}`}
        name="movies-card__save-button"
        aria-label="Сохранить фильм"
        value=""
      />
      <img
        src={movie.link}
        alt={movie.name}
        className="movies-card__image"
      />
    </div>
  );
}

MoviesCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.string,
    link: PropTypes.string.isRequired,
    save: PropTypes.bool,
  }),
};

MoviesCard.defaultProps = {
  movie: {
    duration: 'Unknown',
    link: '../../../images/default_image.jpg',
    save: false,
  },
};

export default MoviesCard;
