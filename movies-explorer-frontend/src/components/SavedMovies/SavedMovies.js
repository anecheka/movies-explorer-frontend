import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import TumblerMovies from '../TumblerMovies/TumblerMovies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedMovies({ 
  searchSavedQuery,
  setSearchSavedQuery, 
  handleShowMoreMovies, 
  moreButtonHidden, 
  searchResultsShown, 
  loading, 
  tumblerOn, 
  handleShowShortMovies, 
  onSaveMovie, 
  isInAllMovies, 
  moviesData,
  savedMoviesData,
  onDeleteMovie, 
  handleShowShortSavedMovies,
  }) {

  // const currentUser = useContext(CurrentUserContext);

  // const history = useHistory();
  // const [userMoviesData, setUserMoviesData] = useState([]);

  // const getUserSavedMovies = (movies) => {
  //   let userMovies
  //   userMovies = movies.filter((movie) => movie.owner === currentUser._id)
  //   return userMovies
  // }

  // useEffect (() => {
  //   const userMovies = getUserSavedMovies(savedMoviesData);
  //   setUserMoviesData(userMovies);
  //    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


  // useEffect (() => {
  //   localStorage.setItem("saved", JSON.stringify(savedMoviesData))
  // }, [savedMoviesData]);

  return (
    <main className="movies">
         <SearchForm
          setSearchSavedQuery={setSearchSavedQuery}
        />
        <TumblerMovies 
          tumblerOn={tumblerOn}
          handleShowShortSavedMovies={handleShowShortSavedMovies}
          handleShowShortMovies={handleShowShortMovies}
          isInAllMovies={isInAllMovies}
        />
        <MoviesCardList 
            loading={loading}
            searchSavedQuery={searchSavedQuery}
            moviesData={moviesData}
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