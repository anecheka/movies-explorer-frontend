import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import TumblerMovies from '../TumblerMovies/TumblerMovies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedMovies({ 
  searchQuery, 
  setSearchQuery, 
  handleShowMoreMovies, 
  moreButtonHidden, 
  searchResultsShown, 
  loading, 
  tumblerOn, 
  handleShowShortMovies, 
  onSaveMovie, 
  isInAllMovies, 
  moviesData, 
  onDeleteMovie, 
  handleShowShortSavedMovies,
  }) {

  const currentUser = useContext(CurrentUserContext);

  const history = useHistory();
  const [savedMoviesData, setSavedMoviesData] = useState([]);

  const getUserSavedMovies = (movies) => {
    let userMovies
    userMovies = movies.filter((movie) => movie.owner === currentUser._id)
    return userMovies
  }

  useEffect (() => {
    const userMovies = getUserSavedMovies(moviesData);
    setSavedMoviesData(userMovies);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);


  useEffect (() => {
    localStorage.setItem("saved", JSON.stringify(savedMoviesData))
  }, [savedMoviesData]);

  return (
    <main className="movies">
         <SearchForm
          setSearchQuery={setSearchQuery}
        />
        <TumblerMovies 
          tumblerOn={tumblerOn}
          handleShowShortSavedMovies={handleShowShortSavedMovies}
          handleShowShortMovies={handleShowShortMovies}
          isInAllMovies={isInAllMovies}
        />
        <MoviesCardList 
            loading={loading}
            searchQuery={searchQuery}
            savedMoviesData={savedMoviesData}
            handleShowMoreMovies={handleShowMoreMovies}
            moreButtonHidden={moreButtonHidden}
            searchResultsShown={searchResultsShown}
            onSaveMovie={onSaveMovie}
            isInAllMovies={isInAllMovies}
            onDeleteMovie={onDeleteMovie}
          />
    </main>
  );
}

export default SavedMovies;