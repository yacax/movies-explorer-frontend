import { useState, useEffect } from 'react';
import mainApi from '../utils/MainApi';

function useMovie(currentUser) {
  const [savedMovies, setSavedMovies] = useState([]);

  const saveMovie = (movie) => {
    mainApi.postMovie(movie)
      .then((response) => {
        const newMovie = response.data;
        setSavedMovies((prevMovies) => [...prevMovies, newMovie]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMovie = ({ _id }) => {
    mainApi.deleteMovie(_id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter((m) => m._id !== _id);
        setSavedMovies(updatedSavedMovies);
      })
      .catch((err) => console.error('Error deleting movie:', err));
  };

  const saveMovieButtonHandle = (movie) => {
    const findIsMovieSaved = savedMovies.find((m) => m.movieId === movie.movieId);
    if (!findIsMovieSaved) {
      saveMovie(movie);
    } else {
      deleteMovie(findIsMovieSaved);
    }
  };

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      mainApi.getSavedMovies()
        .then((res) => {
          if (res && res.data && res.data.length > 0) {
            setSavedMovies(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return {
    savedMovies,
    setSavedMovies,
    saveMovieButtonHandle,
  };
}

export default useMovie;
