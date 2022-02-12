export const BASE_URL = 'https://api.cinematheque.nomoredomains.work';
// export const BASE_URL = 'http://localhost:3001';

const handleResponse = response =>
    response.ok 
    ? response.json()
    : Promise.reject(response.status)

export const register = ({email, password, name}) => {
  return fetch(`${BASE_URL}/signup`, {
    mode: "cors",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name})
  })
  .then (response => {
    if (!response.ok && response.status===409) {
      throw Error ('Пользователь с таким email уже зарегистрирован')
    } else if (!response.ok && response.status===400) {
      throw Error ('Данные неполные или заполнены некорректно')
    }  else if (!response.ok && response.status===500) {
      throw Error ('Произошла ошибка на сервере. Попробуйте позже')
    } else if (!response.ok && response.status===401) {
      throw Error ('Произошла ошибка. Попробуйте позже')
    }
    return response.json();
  })
};

export const authorize = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
      mode: "cors",
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': true,
      },
      body: JSON.stringify({email, password}),
    })
    .then (response => {
      if (!response.ok && response.status===401) {
        throw Error ('Не получилось залогиниться. Попробуйте снова.')
      } else if (!response.ok && response.status===400) {
        throw Error ('Данные неполные или заполнены некорректно')
      }  else if (!response.ok && response.status===500) {
        throw Error ('Произошла ошибка на сервере. Попробуйте позже')
      }
      return response.json();
    })
  }; 

  export const getUserData = () => {
    return fetch(`${BASE_URL}/users/me`, {
      mode: "cors",
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': true,
      },
      credentials: 'include'
    })
    .then (handleResponse); 
  }

  export const updateUserData = (newName, newEmail) => {
    return fetch(`${BASE_URL}/users/me/`, {
      mode: "cors",
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': true,
      },
      credentials: 'include',
      body: JSON.stringify({name: newName, email: newEmail}),
    })
    .then (response => {
      if (!response.ok && response.status===409) {
        throw Error ('Пользователь с таким email уже зарегистрирован.')
      } else if (!response.ok && response.status===400) {
        throw Error ('Данные неполные или заполнены некорректно.')
      }  else if (!response.ok && response.status===500) {
        throw Error ('Произошла ошибка на сервере. Попробуйте позже.')
      }
      return response.json();
    })
  }

  export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
      mode: "cors",
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': true,
      },
      credentials: 'include'
    })
    .then (handleResponse); 
  }

  export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
      mode: "cors",
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': true,
      },
      credentials: 'include',
    })
    .then (handleResponse); 
  }

  export const saveMovie = ({movieId, country, director, duration, year, description, trailer, nameRU, nameEN, thumbnail, image}) => {
    return fetch(`${BASE_URL}/movies`, {
      mode: "cors",
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': true,
      },
      credentials: 'include',
      body: JSON.stringify({movieId, country, director, duration, year, description, trailer, nameRU, nameEN, thumbnail, image}),
    })
    .then (handleResponse); 
  }

  export const removeFromSavedMovies = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
      mode: "cors",
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': true,
      },
      credentials: 'include',
    })
    .then (handleResponse); 
  }