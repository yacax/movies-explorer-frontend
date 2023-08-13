const BASE_BACKEND_URL = 'https://api.tarantino.nomoredomains.work';
const BASE_MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const BASE_IMAGE_URL = 'https://api.nomoreparties.co/';

const REGEXP = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  JWT_PATTERN: /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
};

const TEXTS_ERROR_MESSAGES = {
  REQUEST_ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  MOVIE_NOT_FOUND_ERROR: 'Ничего не найдено',
  SEARCH_EMPTY_ERROR: 'Нужно ввести ключевое слово',
};

const AUTH_ERROR_MESSAGES = {
  HELLO: 'Здравствуйте!',
  SUCCESS_REGISTRATION: 'Вы успешно зарегистрировались!',
  SERVER_RESP_ERROR: 'Ошибка в ответе с сервера',
  SMTH_WENT_WRONG: 'Что-то пошло не так! Попробуйте ещё раз.',
  SUCCESS: 'Успешно!',
};

const FORM_ERRORS_MESSAGES = {
  EMAIL: 'Неверный адрес электронной почты',
  CONFIRM_PASSWORD: 'Пароли не одинаковые',
};

const VALID_PATHS = ['/movies', '/saved-movies', '/profile', '/signin', '/signup'];

export {
  BASE_BACKEND_URL,
  BASE_MOVIES_URL,
  BASE_IMAGE_URL,
  REGEXP,
  TEXTS_ERROR_MESSAGES,
  AUTH_ERROR_MESSAGES,
  FORM_ERRORS_MESSAGES,
  VALID_PATHS,
};
