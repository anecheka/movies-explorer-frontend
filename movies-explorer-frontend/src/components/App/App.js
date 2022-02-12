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
import { BASE_URL } from '../../utils/MoviesApi';


import { getAllMovies } from '../../utils/MoviesApi';
import { register, authorize, getUserData, logout, updateUserData, saveMovie, getSavedMovies, removeFromSavedMovies } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const location = useLocation();
  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsShown, setSearchResultsShown] = useState(true);
  const [loading, setLoading] = useState(false);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [count, setCount] = useState(0);
  const [moreButtonHidden, setMoreButtonHidden] = useState(false);
  const [allMoviesToShow, setAllMoviesToShow] = useState([]);
  const [filteredMoviesInChunks, setFilteredMoviesInChunks] = useState([]);
  const [numberOfChunks, setNumberOfChunks] = useState(0);
  const [tumblerOn, setTumblerOn] = useState (false);
  const [serverError, setServerError] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn ] = useState(false);
  // const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [allSavedMoviesToShow, setAllSavedMoviesToShow] = useState([]);


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
        // setAllMovies(movies);
      })
        .catch((err) => {
            console.log(err)
        });
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

      getSavedMovies()
      .then((movies) => setSavedMovies(movies))
        .catch((err) => console.log(err)
        );
  }, []);

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
    const filteredMovies = filterMovies(allMovies, searchQuery);

    if (searchQuery !=='' && filteredMovies.length === 0) {
      setSearchResultsShown(false);
      setMoreButtonHidden(true);
      setTumblerOn(false);
      } else if (searchQuery !== '' && filteredMovies.length !== 0) {
        setSearchResultsShown(true);
        let moviesInChunks = getChunks(filteredMovies, chunkSize);
        setFilteredMoviesInChunks(moviesInChunks);
        setNumberOfChunks(moviesInChunks.length);
        setMoviesToShow(moviesInChunks[0]);
        setMoreButtonHidden(false);
        setTumblerOn(false);
  }}, [searchQuery, chunkSize]);

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
        localStorage.removeItem('message');
        setLoggedIn(false);
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  const handleSaveMovie = ({movieId, country, director, duration, year, description, trailer, nameRU, nameEN, thumbnail, image}) => {
   
    saveMovie({movieId, country, director, duration, year, description, trailer, nameRU, nameEN, thumbnail, image})
     .then(() => getSavedMovies())
      .then((movies) => setSavedMovies(movies))
        .catch(err => console.log(err));
  }

  const handleDeleteMovie = (movie) => {
    removeFromSavedMovies(movie._id)
     .then(() => getSavedMovies())
     .then((movies) => setSavedMovies(movies))
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
              moviesData={moviesToShow}
              savedMoviesData={savedMovies}
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
                setSearchQuery={setSearchQuery}
                tumblerOn={tumblerOn}
                handleShowShortMovies={handleShowShortMovies}
                moreButtonHidden={true}
                searchResultsShown={searchResultsShown}
                loading={loading}
                onSaveMovie={handleSaveMovie}
                moviesData={savedMovies}
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
