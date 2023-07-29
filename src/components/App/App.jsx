import React, { useState, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
// import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
// import IsLoggedIn from '../../contexts/IsLoggedInContext';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import IsLoggedInContext from '../../contexts/IsLoggedInContext';
import ProtectedRoute from '../ProtetedRoute';

function App() {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const valueMemoLoggedIn = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);
  const memoIsLoggedInContext = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);
  // const navigate = useNavigate();

  // const loginHandler = () => {
  //   setIsLoggedIn(true);
  //   navigate('/movies');
  // };

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   setIsLoggedIn(true);
  //   navigate('/movies');
  // };

  return (
    // <IsLoggedInContext.Provider value={memoIsLoggedInContext}>
    <IsLoggedInContext.Provider value={memoIsLoggedInContext}>
      <div className="body">
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={(
                <Main />
              )}
            />
            <Route
              path="/movies"
              element={(
                <ProtectedRoute
                  path="/movies"
                  component={Movies}
                />
              )}
            />
            <Route
              path="/saved-movies"
              element={(
                <ProtectedRoute
                  path="/saved-movies"
                  component={SavedMovies}
                />
              )}
            />
            {/* <Route
              path="/saved-movies"
              element={(
                <>
                  <Header />
                  <SavedMovies />
                  <Footer />
                </>
              )}
            /> */}
            <Route
              path="/profile"
              element={(
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                />
              )}
            />
            {/* <Route
              path="/profile"
              element={(
                <>
                  <Header />
                  <Profile />
                </>
              )}
            /> */}
            <Route
              path="/signin"
              element={(
                <Login />
              )}
            />
            <Route
              path="/signup"
              element={(
                <Register />
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
      </div>
    </IsLoggedInContext.Provider>

  );
}

export default App;
