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
import { SHORT_MOVIE_LENGTH } from '../../utils/constants';

import { getAllMovies, BASE_URL } from '../../utils/MoviesApi';
import { register, authorize, getUserData, logout, updateUserData, saveMovie, getSavedMovies, removeFromSavedMovies } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  /*
  localStorage

  'message' - пользователь авторизован 
  'movies' - все фильмы из API BeatFilmFestival 
  'saved' - все фильмы, сохраненные пользователем 
  'query' - последний запрос пользователя на странице Фильмы 
  'tumblerOn' - при последнем поиске был включен режим корометражек
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
  const [moreButtonHidden, setMoreButtonHidden] = useState(true);
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

  //Выбираю все фильмы, сохраненные конкретным пользователем, из массива 
  const getUserSavedMovies = (movies) => {
    let userMovies
    userMovies = movies.filter((movie) => movie.owner === currentUser._id)
    return userMovies
  }

  const pullLatestUserSavedsMovies = () => {
    getSavedMovies()
      .then((res) => setSavedMovies(getUserSavedMovies(res)))
        .catch((err) => console.log(err)
        )
  }
  
  useEffect (() => {

    if (localStorage.getItem("message")) {
      tokenCheck();
      // console.log('Проверяю токен')
      // console.log(`${currentUser} при проверке токена`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect (() => {

    if (localStorage.getItem("message") && !localStorage.getItem("movies")) {
      setLoading(true)
      getMoviesForSearch()
      .then(() => setLoading(false))
        .catch((err) => console.log(err)
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect (() => {

    // console.log('Получаю фильмы, сохраненные пользователем')

    if (localStorage.getItem("message")) {
      pullLatestUserSavedsMovies()
    }
  }, [currentUser]);

  useEffect (() => {

    if (localStorage.getItem("query")) {
      setSearchQuery(localStorage.getItem("query"));
    };
  }, [history]);

  useEffect (() => {

    if (location.pathname ==='/movies' && localStorage.getItem("tumblerOn")) {
      setTumblerOn(true);
    } else if (location.pathname ==='/movies' && !localStorage.getItem("tumblerOn")){
      setTumblerOn(false);
    }
  }, [location]);

  useEffect (() => {

    if (location.pathname ==='/saved-movies' && localStorage.getItem("tumblerOn")) {
      setTumblerOn(false);
    }
  }, [location]);


  useEffect (() => {

    if (localStorage.getItem("message")) {
      setSearchSavedQuery('');
    };
  }, [history, setTumblerOn]);

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
    setCount((chunk) => chunk + 1);
    getMoviesChunk(count, filteredMoviesInChunks);
  }

  //Функция получения массива короткометражек
  const getShowShortMovies = (movies) => {
    
    setMoreButtonHidden(true);

    let shortMovies = movies.filter((movie) => { 
      return movie.duration <= SHORT_MOVIE_LENGTH
    });
    return shortMovies;
  }

  //Функция управления показом короткометражек на странице Фильмы 
  const handleShowShortMovies = () => {

    const foundMovies = JSON.parse(localStorage.getItem("foundMovies"));

    if (!tumblerOn) {
      setTumblerOn(true);
      localStorage.setItem("tumblerOn","showsShortMovies");
      let shortMoviesToShow = getShowShortMovies(foundMovies);
      setAllMoviesToShow(foundMovies);
      setMoviesToShow(shortMoviesToShow);
    } else {
      setTumblerOn(false);
      localStorage.removeItem("tumblerOn");
      setMoviesToShow(allMoviesToShow);
      console.log(allMoviesToShow);
    }
  }

  const handleShowShortSavedMovies = () => {

    if (!tumblerOn) {
      setTumblerOn(true);
      let shortMoviesToShow = getShowShortMovies(savedMoviesToShow)
      setAllSavedMoviesToShow(savedMoviesToShow);
      setSavedMoviesToShow(shortMoviesToShow);
    } else {
      setTumblerOn(false);
      setSavedMoviesToShow(allSavedMoviesToShow);
    }
  }

  useEffect (() => {

    const allMovies = JSON.parse(localStorage.getItem("movies"));

    const filteredMovies = filterMovies(allMovies, searchQuery);
    localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));

    if (searchQuery !=='' && filteredMovies.length === 0) {
      setSearchResultsShown(false);
      setMoreButtonHidden(true);
      setMoviesToShow([]);
      setTumblerOn(false);
      } else if (searchQuery !=='' && filteredMovies.length !== 0 && !localStorage.getItem("tumblerOn")) {
        setSearchResultsShown(true);
        let moviesInChunks = getChunks(filteredMovies, chunkSize);
        setFilteredMoviesInChunks(moviesInChunks);
        setNumberOfChunks(moviesInChunks.length);
        setMoviesToShow(moviesInChunks[0]);
        setMoreButtonHidden(false);
        setTumblerOn(false);
        } else if (searchQuery === '') {
            setSearchResultsShown(false);
            } else if (searchQuery !=='' && filteredMovies.length !== 0 && localStorage.getItem("tumblerOn")){
              setSearchResultsShown(true);
              let shortMoviesToShow = getShowShortMovies(filteredMovies);
              setAllMoviesToShow(filteredMovies);
              setMoviesToShow(shortMoviesToShow);
              setMoreButtonHidden(true);
            }
}, [searchQuery, chunkSize, location, history]);


useEffect (() => {

  const filteredSavedMovies = filterMovies(savedMovies, searchSavedQuery); 
  
  if (searchSavedQuery !=='' && filteredSavedMovies.length === 0) {
    setSearchResultsShown(true);
    setMoreButtonHidden(true);
    setTumblerOn(false);
    } else if (searchSavedQuery !== '' && filteredSavedMovies.length !== 0) {
      setSearchResultsShown(true);
      setSavedMoviesToShow(filteredSavedMovies);
      setMoreButtonHidden(true);
      setTumblerOn(false);
      } else if (searchSavedQuery === '' && savedMovies.length !== 0) {
        setSearchResultsShown(true);
        setSavedMoviesToShow(savedMovies);
        setMoreButtonHidden(true);
        setTumblerOn(false);
        }
}, [searchSavedQuery, setSearchQuery, history, savedMovies]);

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
        getMoviesForSearch();
        history.push('/movies');
      }).catch (
        ((err) => {
        setServerError(err.message);
        })
    )
  }

  const tokenCheck = () => { 
    getUserData()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        if (location.pathname === '/signin' || location.pathname === '/signup') {
              history.push('/movies');
            };
        })
            .catch(err => console.log(err, "Ошибка проверки токена"));
  }

  const handleEditProfile = ({name, email}) => {

   updateUserData(name, email)
    .then((user) => {
      setServerError('Данные обновлены');
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
        let keysToRemove = ['message', 'query', 'savedQuery', 'foundMovies', 'tumblerOn', 'movies'];

        keysToRemove.forEach(k =>
          localStorage.removeItem(k))

        setLoggedIn(false);
        setMoviesToShow([]);
        setSavedMoviesToShow([]);
        setSavedMovies([]);
        setAllSavedMoviesToShow([]);
        setAllMoviesToShow([]);
        setTumblerOn(false);
        setSearchQuery('');
        setSearchSavedQuery('');
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  const handleSaveMovie = ({movieId, country, director, duration, year, description, trailer, nameRU, nameEN, thumbnail, image}) => {
    // console.log(savedMovies)
    // console.log(getSavedMovies().then((res) => console.log(res)))
    // console.log(`Вывожу ${currentUser._id} при сохранении фильма`)
    saveMovie({movieId, country, director, duration, year, description, trailer, nameRU, nameEN, thumbnail, image})
     .then(() => pullLatestUserSavedsMovies())
        .catch(err => console.log(`Oшибка ${err} при сохранении фильма ${currentUser._id}`));
  }

  const handleDeleteMovie = (movie) => {
    // console.log(`Вывожу ${currentUser._id} при удалении из сохраненных`)
    removeFromSavedMovies(movie._id)
      .then(() => pullLatestUserSavedsMovies())
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
              searchSavedQuery={searchSavedQuery}
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
                searchQuery={searchQuery}
                searchSavedQuery={searchSavedQuery}
                setSearchSavedQuery={setSearchSavedQuery}
                tumblerOn={tumblerOn}
                handleShowShortMovies={handleShowShortMovies}
                moreButtonHidden={true}
                searchResultsShown={searchResultsShown}
                loading={loading}
                onSaveMovie={handleSaveMovie}
                moviesData={savedMoviesToShow} //фильмы, которые отображаю в текущей выдаче 
                savedMoviesData={savedMovies}  //все фильмы, сохраненные пользователем
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
