// const baseBackendUrl = 'api.tarantino.nomoredomains.work';
const baseBackendUrl = 'http://localhost:3000';
const baseMoviesUrl = 'https://api.nomoreparties.co/beatfilm-movies';
const baseImageUrl = 'https://api.nomoreparties.co/';

const textsErrorMessages = {
  requestError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  movieNotFoundError: 'Ничего не найдено',
};

export {
  baseBackendUrl,
  baseMoviesUrl,
  baseImageUrl,
  textsErrorMessages,
};
