import React, { useState, useEffect } from 'react';
import { BASE_IMAGE_URL, TEXTS_ERROR_MESSAGES } from '../utils/constants';
import CurrentUserContext from '../contexts/CurrentUserContext';

const useSearch = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [findedMovies, setFindedMovies] = useState([]);
  const [isNotFoundMessage, setIsNotFoundMessage] = useState('');
  const [isShortsOnly, setIsShortsOnly] = useState(false);
  const [originalSearchResults, setOriginalSearchResults] = useState([]);

  const optimizeArray = (arr) => arr.map((movie) => {
    const {
      nameRU = '',
      duration = '',
      searchRate = 0,
      image: {
        url: imageUrl = '',
        formats: { thumbnail: { url: thumbnail = '' } } = {},
      } = {},
      country,
      director,
      year,
      description,
      trailerLink,
      owner = currentUser._id,
      id: movieId = '',
      nameEN = '',
      created_at: createdAt = '',
    } = movie;
    const fullImagelUrl = BASE_IMAGE_URL + imageUrl;
    const fullThumbnailUrl = BASE_IMAGE_URL + thumbnail;

    return {
      movieId,
      nameRU,
      duration,
      image: fullImagelUrl,
      country,
      director,
      year,
      description,
      trailerLink,
      thumbnail: fullThumbnailUrl,
      nameEN,
      createdAt,
      searchRate,
      owner,
    };
  });

  const isArrayOptimized = (arr) => {
    if (arr.length === 0) return true;
    return arr[0].movieId && arr[0].nameRU && arr[0].image && arr[0].thumbnail;
  };

  const searchInArray = (req, arr) => {
    const wordsList = req.toLowerCase().match(/[а-яё]{1,}|[a-z]{1,}/g);
    const wordsListUniqObj = Array.from(new Set(wordsList));

    function countFields(movie, word) {
      let count = 0;
      Object.keys(movie).forEach((prop) => {
        if (typeof movie[prop] === 'string' && movie[prop].toLowerCase().includes(word)) {
          count += 1;
        }
      });
      return count;
    }

    const resultMoviesRangeArray = arr.map((movie) => {
      const searchRate = wordsListUniqObj
        .reduce((acc, word) => acc + countFields(movie, word), 0);
      return { ...movie, searchRate };
    });

    const finalSearchResult = resultMoviesRangeArray
      .filter((movie) => movie.searchRate > 0)
      .sort((a, b) => b.searchRate - a.searchRate);

    return finalSearchResult;
  };

  const performSearch = (searchRequest, moviesArray) => {
    const moviesToSearch = isArrayOptimized(moviesArray) ? moviesArray : optimizeArray(moviesArray);

    let searchResult;

    if (searchRequest.trim() === '*') {
      searchResult = moviesToSearch;
    } else {
      searchResult = searchInArray(searchRequest, moviesToSearch);
    }

    setOriginalSearchResults(searchResult);

    if (isShortsOnly) {
      searchResult = searchResult.filter((movie) => movie.duration <= 40);
    }

    if (searchResult.length === 0) {
      setFindedMovies([]);
      setIsNotFoundMessage(TEXTS_ERROR_MESSAGES.MOVIE_NOT_FOUND_ERROR);
    } else {
      setIsNotFoundMessage('');
      setFindedMovies(searchResult);
    }
  };

  useEffect(() => {
    let updatedResults = [...originalSearchResults];
    if (isShortsOnly) {
      updatedResults = updatedResults.filter((movie) => movie.duration <= 40);
    }

    if (updatedResults.length === 0) {
      setIsNotFoundMessage(TEXTS_ERROR_MESSAGES.MOVIE_NOT_FOUND_ERROR);
    } else {
      setIsNotFoundMessage('');
    }

    setFindedMovies(updatedResults);
  }, [isShortsOnly, originalSearchResults]);

  const resetSearch = () => {
    setFindedMovies([]);
    setIsNotFoundMessage('');
    setIsShortsOnly(false);
    setOriginalSearchResults([]);
  };

  return {
    performSearch,
    findedMovies,
    setFindedMovies,
    isNotFoundMessage,
    isShortsOnly,
    setIsShortsOnly,
    setIsNotFoundMessage,
    resetSearch,
  };
};

export default useSearch;
