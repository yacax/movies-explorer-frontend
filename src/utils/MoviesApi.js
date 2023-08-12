import { baseMoviesUrl } from './constants';

const getMoviesRequest = () => fetch(baseMoviesUrl)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Ошибка код ${response.status}`);
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });

export default getMoviesRequest;
