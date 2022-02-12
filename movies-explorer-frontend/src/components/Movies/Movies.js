import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import TumblerMovies from '../TumblerMovies/TumblerMovies';

function Movies({ 
  searchQuery, 
  setSearchQuery, 
  moviesData, 
  handleShowMoreMovies, 
  moreButtonHidden, 
  searchResultsShown, 
  loading, 
  tumblerOn, 
  handleShowShortMovies, 
  onSaveMovie, 
  isInAllMovies,
  handleShowShortSavedMovies,
  savedMoviesData,
  onDeleteMovie
 }) {

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
            moviesData={moviesData}
            handleShowMoreMovies={handleShowMoreMovies}
            moreButtonHidden={moreButtonHidden}
            searchResultsShown={searchResultsShown}
            isLoggedIn={false}
            onSaveMovie={onSaveMovie}
            isInAllMovies={isInAllMovies}
            savedMoviesData={savedMoviesData}
            onDeleteMovie={onDeleteMovie}
        />
    </main>
  );
}

export default Movies;