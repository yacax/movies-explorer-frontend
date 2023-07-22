import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  // const navigate = useNavigate();

  return (
    <div className="body">
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <Header />
                <Main />
                <Footer />
              </>
            )}
          />
          <Route
            path="/movies"
            element={(
              <>
                <Header
                  isLoggedIn
                />
                <Movies />
                <Footer />
              </>
            )}
          />
          <Route
            path="/saved-movies"
            element={(
              <>
                <Header
                  isLoggedIn
                />
                <SavedMovies />
                <Footer />
              </>
            )}
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;
