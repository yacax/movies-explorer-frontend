import React from 'react';
import './MoviesCard.css';
import PropTypes from 'prop-types';

function MoviesCard({
  movie,
  savedMoviesPage,
}) {
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
      // disabled={() => { }}
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
  savedMoviesPage: PropTypes.bool,

};

MoviesCard.defaultProps = {
  movie: {
    // name: 'Unknown',
    duration: 'Unknown',
    link: '../../../images/default_image.jpg',
    save: false,
  },
  savedMoviesPage: false,
};

export default MoviesCard;
