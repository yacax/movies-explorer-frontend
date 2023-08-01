import {
  baseBackendUrl,
} from './constants';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.token = '';
  }

  setToken(token) {
    this.token = `Bearer ${token}`;
  }

  _request(url, options) {
    const headersWithToken = {
      ...options.headers,
      Authorization: this.token,
    };
    const optionsWithToken = {
      ...options,
      headers: headersWithToken,
    };
    return fetch(url, optionsWithToken).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error: ${response.status}`);
    });
  }

  register(name, email, password) {
    return this._request(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  authorize(email, password) {
    return this._request(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  getSavedMovies() {
    return this._request(`${this.baseUrl}/movies`, {
      headers: this.headers,
    });
  }

  getUserData() {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  }

  patchUserData(name, about) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    });
  }

  postMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  }) {
    return this._request(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      }),
    });
  }

  deleteMovie(movieId) {
    return this._request(`${this.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }
}

const api = new Api({
  baseBackendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
