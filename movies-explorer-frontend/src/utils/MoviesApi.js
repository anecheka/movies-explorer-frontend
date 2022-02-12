export const BASE_URL = 'https://api.nomoreparties.co';

// const handleResponse = response =>
//     response.ok 
//     ? response.json()
//     : Promise.reject(`Ошибка: ${response.status}`)

const handleResponse = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
}

export const getAllMovies = () => {
  return fetch(`${BASE_URL}/beatfilm-movies`, {
    mode: "cors",
    method: 'GET',
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': true,
    },
    // credentials: 'include',
  })
  .then (handleResponse);
};