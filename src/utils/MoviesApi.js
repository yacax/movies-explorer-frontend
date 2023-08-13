import { BASE_MOVIES_URL, AUTH_ERROR_MESSAGES } from './constants';

const getMoviesRequest = () => fetch(BASE_MOVIES_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${AUTH_ERROR_MESSAGES.SERVER_RESP_ERROR} ${response.status}`);
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });

export default getMoviesRequest;
