import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MainPage from '../MainPage/MainPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
// import IsLoggedInContext from '../../contexts/IsLoggedInContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtetedRoute';
import getMoviesRequest from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { baseImageUrl, textsErrorMessages } from '../../utils/constants';
import Info from '../Info/Info';
// import Error from '../Error/Error';

function App() {
  const navigate = useNavigate();

  // const [currentUser, setCurrentUser] = useState({
  //   _id: '',
  //   name: '',
  //   email: '',
  // });
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    name: '',
    email: '',
    isLoggedIn: false,
  });
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  // const memoIsLoggedInContext = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);

  const [isLoading, setIsLoading] = useState(false);

  const [allFindedMovies, setAllFindedMovies] = useState([]);
  const [findedFilteredMovies, setFindedFilteredMovies] = useState([]);
  const [isMoviesShorts, setIsMoviesShorts] = useState(false);

  const [searchResultMessage, setSearchResultMessage] = useState('');

  const [savedMovies, setSavedMovies] = useState([]);
  const [findedSavedMovies, setFindedSavedMovies] = useState([]);
  // const [findedSavedFilteredMovies, setSavedFilteredMovies] = useState([]);
  const [finalShowingSavedMoviesArray, setFinalShowingSavedMoviesArray] = useState([]);
  const [isSavedMoviesShorts, setIsSavedMoviesShorts] = useState(false);
  const [searchSavedResultMessage, setSearchSavedResultMessage] = useState('');
  const [resetSavedMoviesSearch, setResetSavedMoviesSearch] = useState(false);

  const [info, setInfo] = useState({
    isOpen: false,
    infoMessage: '',
    infoType: false,
  });

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    setToken(jwt);
    mainApi.setToken(jwt);
  }, []);

  useEffect(() => {
    // setIsLoading(true);
    if (!token) {
      // setIsLoading(false);
      return;
    }
    mainApi.getUserData(token)
      .then((user) => {
        setCurrentUser({
          ...currentUser,
          _id: user.data._id,
          name: user.data.name,
          email: user.data.email,
          isLoggedIn: true,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }, [token]);

  const logInState = () => {
    setCurrentUser((prevState) => ({
      ...prevState,
      isLoggedIn: true,
    }));
  };

  // const logOutState = () => {
  //   setCurrentUser((prevState) => ({
  //     ...prevState,
  //     isLoggedIn: false,
  //   }));
  // };

  useEffect(() => {
    mainApi.getSavedMovies().then((res) => {
      if (res.data.length > 0) setSavedMovies(res.data);
    });
    // console.log(savedMovies);
  }, []);

  // useEffect(() => { console.log(currentUser); }, [currentUser]);

  const searchInArray = (req, arr) => {
    const wordsList = req.toLowerCase().match(/[а-яё]{2,}|[a-z]{2,}/g);
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
      const searchRate = wordsListUniqObj.reduce((acc, word) => acc + countFields(movie, word), 0);
      return { ...movie, searchRate };
    });

    const finalSearchResult = resultMoviesRangeArray
      .filter((movie) => movie.searchRate > 0)
      .sort((a, b) => b.searchRate - a.searchRate);

    return finalSearchResult;
  };

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

    const fullImagelUrl = baseImageUrl + imageUrl;
    const fullThumbnailUrl = baseImageUrl + thumbnail;

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

  const getSearchResult = (req, arr) => {
    const searchResult = searchInArray(req, arr);
    const optimizedResult = optimizeArray(searchResult, currentUser, baseImageUrl);
    return optimizedResult;
  };

  // ============================================================

  const searchInAllMovies = (searchRequest) => {
    setIsLoading(true);
    setAllFindedMovies([]);
    getMoviesRequest()
      .then((res) => {
        setAllFindedMovies(getSearchResult(searchRequest, res));
      })
      .catch((err) => {
        setSearchResultMessage(textsErrorMessages.requestError);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const isShortsMoviePageHandler = () => {
    setIsMoviesShorts(!isMoviesShorts);
  };

  const isShortsSavedMoviePageHandler = () => {
    setIsSavedMoviesShorts(!isSavedMoviesShorts);
  };

  useEffect(() => {
    const filteredMovies = allFindedMovies
      .filter((movie) => (isMoviesShorts ? movie.duration <= 40 : true));
    setFindedFilteredMovies(filteredMovies);

    const message = filteredMovies.length === 0 ? textsErrorMessages.movieNotFoundError : '';
    setSearchResultMessage(message);
  }, [allFindedMovies, isMoviesShorts]);

  // ============================SAVEDMOVIES===========================================

  // useEffect(() => {
  //   console.log(searchSavedResultMessage);
  // }, [searchSavedResultMessage]);

  useEffect(() => { setFinalShowingSavedMoviesArray(savedMovies); }, [savedMovies]);

  const searchInSavedMovies = (searchRequest) => {
    const searchResult = searchInArray(searchRequest, savedMovies);
    // console.log(searchResult.length);
    setFindedSavedMovies(searchResult);
    if (searchResult.length === 0) {
      setSearchSavedResultMessage(textsErrorMessages.movieNotFoundError);
    } else setSearchSavedResultMessage('');
  };

  // useEffect(() => {
  //   console.log(searchSavedResultMessage);
  //   console.log(resetSavedMoviesSearch);
  // }, [resetSavedMoviesSearch]);

  useEffect(() => {
    const moviesArray = (findedSavedMovies.length || searchSavedResultMessage) ? findedSavedMovies
      : savedMovies;
    const moviesFilteredArray = moviesArray
      .filter((movie) => (isSavedMoviesShorts ? movie.duration <= 40 : true));
    setFinalShowingSavedMoviesArray(moviesFilteredArray);
    // if (moviesFilteredArray.length === 0) {
    //   setSearchSavedResultMessage(textsErrorMessages.movieNotFoundError);
    // }
  }, [
    savedMovies,
    findedSavedMovies,
    isSavedMoviesShorts,
    searchSavedResultMessage,
  ]);

  useEffect(() => {
    setFindedSavedMovies([]);
    setSearchSavedResultMessage('');
  }, [resetSavedMoviesSearch]);

  useEffect(() => { setSearchResultMessage(''); }, []);
  // =======================================================================

  const registerUser = ({
    name,
    email,
    password,
  }) => {
    // setIsLoading(true);
    mainApi.register(name, email, password)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          _id: res._id,
          name: res.name,
          email: res.email,
        });
        setInfo({
          ...info,
          isOpen: true,
          infoMessage: 'Вы успешно зарегистрировались!',
          infoType: true,
        });
      }).then(() => {
        mainApi
          .authorize(email, password)
          .then((res) => {
            // console.log(res);
            localStorage.setItem('jwt', res.token);
            mainApi.setToken(res.token);
            logInState();
            // setIsLoggedIn(true);
            navigate('/movies');
          });
      })
      .catch((err) => {
        console.log(err);
        setInfo({
          ...info,
          isOpen: true,
          infoMessage: 'Что-то пошло не так! Попробуйте ещё раз.',
          infoType: false,
        });
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const loginUser = ({ email, password }) => {
    // console.log(email, password);
    // setIsLoading(true);
    mainApi
      .authorize(email, password)
      .then((res) => {
        // console.log(res);
        localStorage.setItem('jwt', res.token);
        mainApi.setToken(res.token);
        return mainApi.getUserData(res.token);
      })
      .then((res) => {
        // console.log(res);
        setCurrentUser({
          _id: res._id,
          name: res.name,
          email: res.email,
        });
        logInState();
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setInfo({
          ...info,
          isOpen: true,
          infoMessage: 'Неправильный логин или пароль!',
          result: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logOut = () => {
    localStorage.removeItem('jwt');
    // setIsLoggedIn(false);
    setToken('');
    setCurrentUser({
      _id: '',
      name: '',
      email: '',
      isLoggedIn: false,
    });
  };

  // const getSavedMovies = () => {
  //   mainApi.getSavedMovies()
  //     .then((res) => setSavedMovies(res.data))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const saveMovie = ({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    createdAt,
  }) => {
    mainApi.postMovie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      createdAt,
    })
      .then((res) => {
        console.log(res);
        setSavedMovies([
          ...savedMovies,
          res.data,
        ]);
        // console.log(savedMovies);
      })
      .catch((err) => console.log(err));
  };

  // console.log(saveMovie);

  // useEffect(() => { console.log(savedMovies); }, [savedMovies]);

  const deleteMovie = (movie) => {
    // console.log(movie);
    mainApi.deleteMovie(movie._id)
      .then((res) => {
        if (res.data.deletedCount === 1) {
          const updatedSavedMovies = savedMovies.filter((m) => m._id !== movie._id);
          setSavedMovies(updatedSavedMovies);
        }
      })
      .catch((err) => console.log(err));
  };

  const saveMovieButtonHandle = (movie) => {
    const findIsMovieSaved = savedMovies.find((m) => m.movieId === movie.movieId);
    if (!findIsMovieSaved) {
      saveMovie(movie);
    } else {
      deleteMovie(findIsMovieSaved);
    }
    // console.log(findIsMovieSaved._id);
  };

  const changeProfile = (user) => {
    mainApi.patchUserData(user.name, user.email)
      .then((res) => {
        if (res.data) {
          setCurrentUser((prevState) => ({
            ...prevState,
            name: res.data.name,
            email: res.data.email,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    // <IsLoggedInContext.Provider value={memoIsLoggedInContext}>
    <CurrentUserContext.Provider value={currentUser}>

      <div className="body">
        <div className="page">
          <Routes>
            <Route
              path="/movies"
              element={(
                <ProtectedRoute
                  path="/movies"
                  component={Movies}
                  searchHandle={searchInAllMovies}
                  showingMoviesArray={findedFilteredMovies}
                  searchResultMessage={searchResultMessage}
                  savedMovies={savedMovies}
                  isShorts={isMoviesShorts}
                  isShortsHandler={isShortsMoviePageHandler}
                  isLoading={isLoading}
                  // isLoggedIn={currentUser.isLoggedIn}
                  handleMovieButton={saveMovieButtonHandle}
                // logOut={logOut}
                />
              )}
            />
            <Route
              path="/saved-movies"
              element={(
                <ProtectedRoute
                  path="/saved-movies"
                  component={SavedMovies}
                  searchHandle={searchInSavedMovies}
                  // showingMoviesArray={findedSavedFilteredMovies}
                  showingMoviesArray={finalShowingSavedMoviesArray}
                  // showingMoviesArray={showingMoviesArray}
                  searchResultMessage={searchSavedResultMessage}
                  isShorts={isSavedMoviesShorts}
                  isShortsHandler={isShortsSavedMoviePageHandler}
                  isLoading={isLoading}
                  // isLoggedIn={isLoggedIn}
                  // getSavedMovies={getSavedMovies}
                  // setSavedMovies={setSavedMovies}
                  handleMovieButton={deleteMovie}
                  setResetSavedMoviesSearch={setResetSavedMoviesSearch}
                />
              )}
            />
            <Route
              path="/profile"
              element={(
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  // isLoggedIn={isLoggedIn}
                  logOut={logOut}
                  changeProfile={changeProfile}
                />
              )}
            />
            <Route
              path="/"
              element={(
                <MainPage />
              )}
            />
            <Route
              path="/signin"
              element={(
                <Login
                  loginUser={loginUser}
                />
              )}
            />
            <Route
              path="/signup"
              element={(
                <Register
                  registerUser={registerUser}
                />
              )}
            />
            <Route
              path="*"
              element={(
                <NotFoundPage />
              )}
            />
          </Routes>
          <Info />
        </div>
      </div>
    </CurrentUserContext.Provider>
    // </IsLoggedInContext.Provider>
  );
}

export default App;
