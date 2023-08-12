const baseBackendUrl = 'https://api.tarantino.nomoredomains.work';
const baseMoviesUrl = 'https://api.nomoreparties.co/beatfilm-movies';
const baseImageUrl = 'https://api.nomoreparties.co/';

const textsErrorMessages = {
  requestError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  movieNotFoundError: 'Ничего не найдено',
};

const authErrorMessages = {
  successRegistration: 'Вы успешно зарегистрировались!',
  serverRespError: 'Ошибка в ответе с сервера',
  smthWentWrong: 'Что-то пошло не так! Попробуйте ещё раз.',
};

export {
  baseBackendUrl,
  baseMoviesUrl,
  baseImageUrl,
  textsErrorMessages,
  authErrorMessages,
};
