import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import MainPage from '../MainPage/MainPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtetedRoute';
import IsLogginedProtectedRoute from '../IsLogginedProtectedRoute';
import Info from '../Info/Info';
import useAuth from '../../hooks/useAuth';
import useMovie from '../../hooks/useMovie';
import { VALID_PATHS } from '../../utils/constants';

function App() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    name: '',
    email: '',
    isLoggedIn: false,
  });
  const [allMoviesFromMoviesServer, setAllMoviesFromMoviesServer] = useState([]);

  const auth = useAuth(setCurrentUser);
  const { savedMovies, saveMovieButtonHandle } = useMovie(currentUser);

  useEffect(() => {
    if (VALID_PATHS.includes(location.pathname)) {
      localStorage.setItem('lastValidPath', location.pathname);
    }
  }, [location]);

  return (
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
                  savedMovies={savedMovies}
                  handleMovieButton={saveMovieButtonHandle}
                  allMoviesFromMoviesServer={allMoviesFromMoviesServer}
                  setAllMoviesFromMoviesServer={setAllMoviesFromMoviesServer}
                />
              )}
            />
            <Route
              path="/saved-movies"
              element={(
                <ProtectedRoute
                  path="/saved-movies"
                  component={SavedMovies}
                  savedMovies={savedMovies}
                  handleMovieButton={saveMovieButtonHandle}
                />
              )}
            />
            <Route
              path="/profile"
              element={(
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  changeProfile={auth.changeProfile}
                  logOut={auth.logOut}
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
                <IsLogginedProtectedRoute
                  component={Login}
                  loginUser={auth.loginUser}
                />
              )}
            />
            <Route
              path="/signup"
              element={(
                <IsLogginedProtectedRoute
                  component={Register}
                  registerUser={auth.registerUser}
                />
              )}
            />
            <Route
              path="*"
              element={<NotFoundPage lastPath={localStorage.getItem('lastValidPath')} />}
            />
          </Routes>
        </div>
        <Info {...auth.info} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
