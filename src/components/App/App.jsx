import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import Info from '../Info/Info';
import useAuth from '../../hooks/useAuth';
import useMovie from '../../hooks/useMovie';

function App() {
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    name: '',
    email: '',
    isLoggedIn: false,
  });

  const auth = useAuth(setCurrentUser);

  const { savedMovies, saveMovieButtonHandle } = useMovie(currentUser);

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
                <Login
                  loginUser={auth.loginUser}
                />
              )}
            />
            <Route
              path="/signup"
              element={(
                <Register
                  registerUser={auth.registerUser}
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
        </div>
        <Info {...auth.info} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
