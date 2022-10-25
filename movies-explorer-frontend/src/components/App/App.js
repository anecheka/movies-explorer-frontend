import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../Header/Header';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';
import useCurrentChunkSize from '../../utils/hooks/useCurrentChunkSize';

import { getAllMovies, BASE_URL } from '../../utils/MoviesApi';
import { register, authorize, getUserData, logout, updateUserData, saveMovie, getSavedMovies, removeFromSavedMovies } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';

function App() {

  /*
  localStorage

  'message' - пользователь авторизован 
  'movies' - все фильмы из API BeatFilmFestival 
  'saved' - все фильмы, сохраненные пользователем 
  'query' - последний запрос пользователя на странице Фильмы 
  'savedQuery' - последний запрос пользователя на странице Сохраненные фильмы 
  'foundAllMovies' - поисковая выдача по запросу 'query', для страницы Фильмы 
  'foundAllSavedMovies' - поисковая выдача по запросу 'savedQuery', для страницы Сохраненные фильмы 

  */

  const location = useLocation();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSavedQuery, setSearchSavedQuery] = useState('');
  const [searchResultsShown, setSearchResultsShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const [moviesToShow, setMoviesToShow] = useState([]); // массив фильмов для отображения на странице Фильмы
  const [savedMoviesToShow, setSavedMoviesToShow] = useState([]); //массив фильмов для отображения на странице Сохраненные фильмы (фильмы, сохраненные пользователем)
  const [savedMovies, setSavedMovies] = useState([]); //массив фильмов, сохраненных пользователем 
  const [allSavedMoviesToShow, setAllSavedMoviesToShow] = useState([]); //массив всех сохраненных фильмов пользователя в текущем поиске (временное хранение для фильтра коротметражек)
  const [allMoviesToShow, setAllMoviesToShow] = useState([]); //массив всех фильмов пользователя в текущем поиске (временное хранение для фильтра коротметражек)

  const [count, setCount] = useState(0);
  const [moreButtonHidden, setMoreButtonHidden] = useState(false);
  const [filteredMoviesInChunks, setFilteredMoviesInChunks] = useState([]);
  const [numberOfChunks, setNumberOfChunks] = useState(0);
  const [tumblerOn, setTumblerOn] = useState (false);
  const [serverError, setServerError] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn ] = useState(false);

  //Забираю все фильмы из BeatFilm API
  const getMoviesForSearch = () => {

    getAllMovies()
      .then((res) => {
        const movies = res.map((card) => {
         return {
            movieId: card.id,
            country: card.country,
            director: card.director,
            duration: card.duration,
            year: card.year,
            description: card.description,
            nameRU: card.nameRU,
            nameEN: card.nameEN,
            image: `${BASE_URL}${card.image.url}`,
            thumbnail: `${BASE_URL}${card.image.formats.thumbnail.url}`,
            trailer: card.trailerLink,
          }
        })
        localStorage.setItem("movies", JSON.stringify(movies));
      })
        .catch((err) => {
            console.log(err)
        });
  }

  //Выбираю все фильмы, сохраненные конкретным пользователем, из массива сохраненных 
  const getUserSavedMovies = (movies) => {
    let userMovies
    userMovies = movies.filter((movie) => movie.owner === currentUser._id)
    return userMovies
  }

  const saveMoviesToLocalStorage = () => {
    getSavedMovies()
      .then((res) => setSavedMovies(getUserSavedMovies(res)))
        .catch((err) => console.log(err)
        )
  }
  
  useEffect (() => {

    if (localStorage.getItem("message")) {
      tokenCheck();
      getMoviesForSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  useEffect (() => {

    if (localStorage.getItem("message")) {
      getUserData()
        .then((user) => setCurrentUser(user))
          .then(() => setLoggedIn(true))
            .catch ((err) => console.log(err))
    };
  }, [history]);

  useEffect (() => {

    if (localStorage.getItem("message")) {
      saveMoviesToLocalStorage();
      localStorage.setItem("saved", JSON.stringify((savedMovies)))
  }}, []);

  useEffect (() => {
    localStorage.setItem("saved", JSON.stringify(savedMovies))
  }, [savedMovies]);

  useEffect (() => {

    if (localStorage.getItem("query") && localStorage.getItem("foundAllMovies")) {
      setSearchQuery(localStorage.getItem("query"));
    };
  }, [history]);

  useEffect (() => {

    if (localStorage.getItem("savedQuery") && localStorage.getItem("foundAllSavedMovies")) {
      setSearchSavedQuery(localStorage.getItem("savedQuery"));
    };
  }, [history]);


  useEffect (() => {

    if (localStorage.getItem("saved")) {
      const movies = JSON.parse(localStorage.getItem("saved"));
      setSavedMoviesToShow(movies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);



  const filterMovies = (movies, query) => {
    if (!query) {
        return;
    }

    return movies.filter((result) => {
      return result.nameRU.toLowerCase().includes(query.toLowerCase())
    });
  };


  let chunkSize = useCurrentChunkSize();

  //функция, чтобы разбить на массив фильмов на чанки 
  const getChunks = (data, chunkSize) => {

    const dataChunks = []

    for (let i = 0; i < data.length; i+= chunkSize) {
      const chunk = data.slice(i, i + chunkSize)
      dataChunks.push(chunk);
    }
    return dataChunks;
  }

  //Функция, чтобы показать только один чанк из массива фильмов 
  const getMoviesChunk = (count, chunks) => {

    const newMoviesToShow = moviesToShow.concat(chunks[count + 1]);
    setMoviesToShow(newMoviesToShow);

    }

  //Функция, чтобы загрузить следующий чанк фильмов при клике на кнопку Еще
  const handleShowMoreMovies = async () => {
    setLoading(true);
    setCount((chunk) => chunk + 1);
    getMoviesChunk(count, filteredMoviesInChunks);
    setLoading(false);
  }

  //Функция получения массива короткометражек
  const getShowShortMovies = (movies) => {

    let shortMovies = movies.filter((movie) => { 
      return movie.duration <= 40
    });
    return shortMovies;
  }

  //Функция управления показом короткометражек на странице Фильмы 
  const handleShowShortMovies = () => {

    if (!tumblerOn) {
      setTumblerOn(true);
      let shortMoviesToShow = getShowShortMovies(moviesToShow)
      setAllMoviesToShow(moviesToShow);
      setMoviesToShow(shortMoviesToShow);
    } else {
      setTumblerOn(false);
      setMoviesToShow(allMoviesToShow);
    }
  }

  const handleShowShortSavedMovies = () => {

    const savedMoviesFromStorage = JSON.parse(localStorage.getItem("saved"));

    if (!tumblerOn) {
      setTumblerOn(true);
      let shortMoviesToShow = getShowShortMovies(savedMoviesFromStorage)
      setAllSavedMoviesToShow(savedMoviesFromStorage);
      setSavedMovies(shortMoviesToShow);
    } else {
      setTumblerOn(false);
      setSavedMovies(allSavedMoviesToShow);
    }
  }

  useEffect (() => {

    const allMovies = JSON.parse(localStorage.getItem("movies"));

    let foundAllMovies
    let filteredMovies

    if (foundAllMovies !== undefined) {
      filteredMovies = foundAllMovies
      } else {
        filteredMovies = filterMovies(allMovies, searchQuery); 
        foundAllMovies = localStorage.setItem("foundAllMovies", JSON.stringify(filteredMovies));
      };

    if (searchQuery !=='' && filteredMovies.length === 0) {
      setSearchResultsShown(false);
      setMoreButtonHidden(true);
      setTumblerOn(false);
      localStorage.setItem("foundAllMovies", []);
      } else if (searchQuery !=='' && filteredMovies.length !== 0) {
        setSearchResultsShown(true);
        let moviesInChunks = getChunks(filteredMovies, chunkSize);
        setFilteredMoviesInChunks(moviesInChunks);
        setNumberOfChunks(moviesInChunks.length);
        setMoviesToShow(moviesInChunks[0]);
        setMoreButtonHidden(false);
        setTumblerOn(false);
        localStorage.setItem('foundAllMovies', JSON.stringify(filteredMovies))
        } else if (searchQuery === '') {
            setSearchResultsShown(false);
            }
}, [searchQuery, chunkSize, history]);


useEffect (() => {

  let allSavedMovies

  if (localStorage.getItem("saved")) {
     allSavedMovies = JSON.parse(localStorage.getItem("saved"));

  let foundAllSavedMovies
  let filteredSavedMovies

  if (foundAllSavedMovies !== undefined) {
    filteredSavedMovies = foundAllSavedMovies
    } else {
      filteredSavedMovies = filterMovies(allSavedMovies, searchSavedQuery); 
      foundAllSavedMovies = localStorage.setItem("foundAllSavedMovies", JSON.stringify(filteredSavedMovies));
    };

  if (searchSavedQuery !=='' && filteredSavedMovies.length === 0) {
    setSearchResultsShown(true);
    setMoreButtonHidden(true);
    setTumblerOn(false);
    } else if (searchSavedQuery !== '' && filteredSavedMovies.length !== 0) {
      setSearchResultsShown(true);
      setSavedMoviesToShow(filteredSavedMovies);
      setMoreButtonHidden(true);
      setTumblerOn(false);
      } else if (searchSavedQuery === '' && filteredSavedMovies !== undefined) {
        setSearchResultsShown(true);
        setSavedMoviesToShow(filteredSavedMovies);
        setMoreButtonHidden(true);
        setTumblerOn(false);
      } else if (searchSavedQuery === '' && (filteredSavedMovies === undefined || foundAllSavedMovies === undefined) && allSavedMovies !== []) {
        setSearchResultsShown(true);
        setSavedMoviesToShow(allSavedMovies);
      }  else if (searchSavedQuery === '' && filteredSavedMovies === undefined && allSavedMovies === []) {
        setSearchResultsShown(false);
      }

    }

}, [searchSavedQuery, setSearchQuery, history]);

//Функция, чтобы скрыть кнопку Еще 
const hideShowMoreMovies = () => {
    if (count === numberOfChunks - 1) {
      setMoreButtonHidden(true);
      setCount(0);
    }
  }

  useEffect (() => 
  
    hideShowMoreMovies(), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  [moviesToShow])

  const handleRegister = ({name, email, password}) => {
    register ({name, email, password})
      .then ((res) => {
        handleLogin({email, password})
      }).catch (
          ((err) => {
          setServerError(err.message);
          })
      )
  }

  const handleLogin = ({email, password}) => {
    authorize ({email, password})
    .then((res) => {
        localStorage.setItem('message','isUserAuth');
        setCurrentUser(res.user);
        setLoggedIn(true);
        setServerError(null);
        history.push('/movies');
      }).catch (
        ((err) => {
        setServerError(err.message);
        })
    )
  }

  const tokenCheck = () => { 
    getUserData()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res.user);
        history.push('/movies');
      })
      .catch(err => console.log(err));
  }

  const handleEditProfile = ({name, email}) => {

   updateUserData(name, email)
    .then((res) => {
      setServerError(null);
      setCurrentUser(user => ({...user, name, email }));
        }).catch(
          ((err) => {
            setServerError(err.message);
            })
        )
}

  const onSignOut = () => {
    logout()
      .then(() => {
        let keysToRemove = ['message', 'query', 'savedQuery', 'foundAllMovies', 'saved', 'foundAllSavedMovies'];

        keysToRemove.forEach(k =>
          localStorage.removeItem(k))

        setLoggedIn(false);
        setMoviesToShow([]);
        setSavedMoviesToShow([]);
        setSavedMovies([]);
        setAllSavedMoviesToShow([]);
        setAllMoviesToShow([]);
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  const handleSaveMovie = ({movieId, country, director, duration, year, description, trailer, nameRU, nameEN, thumbnail, image}) => {
   
    saveMovie({movieId, country, director, duration, year, description, trailer, nameRU, nameEN, thumbnail, image})
     .then(() => saveMoviesToLocalStorage())
        .catch(err => console.log(err));
  }

  const handleDeleteMovie = (movie) => {
    removeFromSavedMovies(movie._id)
      .then(() => saveMoviesToLocalStorage())
        .catch((err) => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        {location.pathname !=='/signin' && location.pathname !=='/signup' && <Header loggedIn={loggedIn}/> }
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute 
            path="/movies"
            loggedIn={loggedIn}
            component = {() => (
              <Movies
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              moviesData={moviesToShow} //фильмы, которые отображаю в текущей выдаче 
              savedMoviesData={savedMovies} //фильмы, сохраненные пользователями 
              handleShowMoreMovies={handleShowMoreMovies}
              tumblerOn={tumblerOn}
              handleShowShortMovies={handleShowShortMovies}
              moreButtonHidden={moreButtonHidden}
              searchResultsShown={searchResultsShown}
              loading={loading}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
              isInAllMovies={true}
            />
            )}
          />
          <ProtectedRoute 
            path="/saved-movies"
            loggedIn={loggedIn}
            component = {() => (
              <SavedMovies
                searchSavedQuery={searchSavedQuery}
                setSearchSavedQuery={setSearchSavedQuery}
                tumblerOn={tumblerOn}
                handleShowShortMovies={handleShowShortMovies}
                moreButtonHidden={true}
                searchResultsShown={searchResultsShown}
                loading={loading}
                onSaveMovie={handleSaveMovie}
                moviesData={savedMoviesToShow} //фильмы, которые отображаю в текущей выдаче 
                savedMoviesData={savedMovies}  //фильмы, сохраненные всеми пользователями 
                isInAllMovies={false}
                onDeleteMovie={handleDeleteMovie}
                handleShowShortSavedMovies={handleShowShortSavedMovies}
              />
            )}
          />
          <ProtectedRoute 
            path="/profile"
            loggedIn={loggedIn}
            component = {() => (
              <Profile
                onEditProfile={handleEditProfile}
                onSignOut={onSignOut}
                serverError={serverError}
              />
            )}
          />
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              serverError={serverError}
            />
          </Route>
          <Route path="/signup">
            <Register 
              onRegister={handleRegister}
              serverError={serverError}
            />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        {location.pathname !=='/signin' && location.pathname !=='/signup' && <Footer/> }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
